import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from
} from "@apollo/client";
import { useMemo } from "react";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKEN } from '../mutations/refreshToken';
import { v4 } from 'uuid';
import { getLocal } from '../utils/utils';

//LINK CONFIG: https://www.apollographql.com/blog/building-a-next-js-app-with-apollo-client-slash-graphql/

let apolloClient;

const refreshAuthToken = async () => {
  const refreshToken = getLocal('refreshToken');
  const client = createApolloClient()
  // Get refresh token from cookies
  console.log('.............................................')
  console.log('refresh auth token with token:')
  console.log(refreshToken)
  console.log('.............................................')
  // Get new auth token from server

  return client.mutate({
      mutation: REFRESH_TOKEN,
      variables: {
        input: {
          clientMutationId: v4(),
          jwtRefreshToken: refreshToken
        }
      },
  })
}

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_ENV_WORDPRESS}/graphql`,
  credentials: "omit",
});

const authLink = setContext((_, { headers }) => {
  if (typeof window !== "undefined") {
    // get the authentication token from local storage if it exists
    const token = getLocal("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
});

const logoutLink = onError(
  ({ networkError, graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(err);
        switch (err.extensions.category) {
          case "internal":
            // error code is set to "internal"
            // when AuthenticationError thrown in resolver

            // modify the operation context with a new token

            // localStorage.clear();
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: refreshAuthToken(),
              },
            });
            // retry the request, returning the new observable
            return forward(operation);

          case "user":
            return;
          default:
            break;
        }
      }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: from([logoutLink, authLink, httpLink]),
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
