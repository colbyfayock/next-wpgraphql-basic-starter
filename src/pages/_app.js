import { ApolloProvider } from '@apollo/client';

import useApolloClient from 'hooks/use-apollo-client';

import '../styles/globals.css'

function MyApp({ Component, pageProps = {} }) {
  const apolloClient = useApolloClient(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp