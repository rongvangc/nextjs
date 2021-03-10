import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  from,
  fromPromise
} from "@apollo/client";
import { useMemo } from "react";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKEN } from "../mutations/refreshToken";
import { v4 } from "uuid";
import { getLocal } from "../utils/utils";

let apolloClient;

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_ENV_WORDPRESS}/graphql`,
  credentials: "omit",
});

const getNewToken = () => {
  const refreshToken = getLocal("refreshToken");
  return apolloClient.mutate({
    mutation: REFRESH_TOKEN,
    variables: {
      input: {
        clientMutationId: v4(),
        jwtRefreshToken: refreshToken,
      },
    },
  });
};

// const authMiddleware = new ApolloLink((operation, forward) => {
//   if (typeof window !== "undefined") {
//     console.log(operation.getContext().headers.authorization);
//     const token = getLocal("token");
//     // add the authorization to the headers
//     operation.setContext({
//       headers: {
//         authorization: token || null,
//       }
//     });
  
//     return forward(operation);
//   }
// })

const authLink = setContext((_, { headers }) => {
  if (typeof window !== "undefined") {
    console.log('runnnn');
    const token = getLocal("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
});

const errorLink = onError(({ networkError, graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(err);
        switch (err.extensions.category) {
          case "internal":
            // return fromPromise(
            //   getNewToken().then((data) => {
            //     console.log('runnnnnnn');
            //   }).catch((error) => {
            //     // Handle token refresh errors e.g clear stored tokens, redirect to login
            //     console.log(error);
            //     return;
            //   })
            // )
            const token = getLocal("token");

            console.log(token);

            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: "",
              },
            });
            // retry the request, returning the new observable
            return forward(operation);
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
);

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
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
