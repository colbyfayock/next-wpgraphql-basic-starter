import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

let apolloClient;


/**
 * createApolloClient
 */

export function _createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
    }),
    cache: new InMemoryCache(),
  });
}

/**
 * initializeApollo
 */

export function initializeApollo(initialState = null) {
  const _apolloClient = getApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here

  if (initialState) {
    // Get existing cache, loaded during client side data fetching

    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data

    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client

  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

/**
 * getApolloClient
 */

export function getApolloClient() {
  return apolloClient ?? _createApolloClient();
}
