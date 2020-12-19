import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { useMemo } from "react";

//LINK CONFIG: https://www.apollographql.com/blog/building-a-next-js-app-with-apollo-client-slash-graphql/
let apolloClient;

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_ENV_WORDPRESS}/graphql`,
    }),
    cache: new InMemoryCache(),
  });
}

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
}

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}