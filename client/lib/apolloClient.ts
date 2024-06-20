import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { getCookie } from 'cookies-next';

const httpLink = new HttpLink({
  //   uri: "https://spacex-production.up.railway.app/",
  uri: "http://localhost:4000/",
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from cookies if it exists
  const token = getCookie('token');
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink), // Concatenate authLink and httpLink
  });
});
