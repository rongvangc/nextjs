import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  fromPromise,
  makeVar
} from "@apollo/client";
import { useMemo } from "react";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { v4 } from "uuid";
import { getLocal, setLocal } from "../utils/utils";
import fetch from "node-fetch";

let apolloClient;

const isBrowser = typeof window !== "undefined";

export const AuthVar = makeVar({
  token: null,
  refreshToken: null
})

const authLink = setContext((_, { headers }) => {
  if (isBrowser) {
    const token = getLocal("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
});

const getNewToken = () => {
  const refreshToken = getLocal("refreshToken");

  const query = `
    mutation refreshJwtAuthToken($input: RefreshJwtAuthTokenInput!) {
      refreshJwtAuthToken(input: $input) {
        authToken
      }
    }
  `;

  return fetch(`${process.env.NEXT_PUBLIC_ENV_WORDPRESS}/graphql`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        input: {
          clientMutationId: v4(),
          jwtRefreshToken: refreshToken || ``,
        },
      },
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => {
      console.log(json);
      const accessToken = json.data.refreshJwtAuthToken.authToken;
      return accessToken;
    })
    .catch((err) => console.log(err));
};

const errorLink = onError(
  ({ networkError, graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(err);
        switch (err.extensions.category) {
          case "internal":
            return fromPromise(
              getNewToken().catch((error) => {
                // Handle token refresh errors e.g clear stored tokens, redirect to login
                return;
              })
            )
              .filter((value) => Boolean(value))
              .flatMap((accessToken) => {
                setLocal('token', accessToken)
                const oldHeaders = operation.getContext().headers;
                // modify the operation context with a new token
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${accessToken}`,
                  },
                });

                // retry the request, returning the new observable
                return forward(operation);
              });
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
);

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_ENV_WORDPRESS}/graphql`,
  credentials: "omit",
});

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: isBrowser,
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
