import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { getCookie } from 'cookies-next';

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
});

const authLink = setContext((_, { headers }) => {
  const token = getCookie('token');
  
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
    link: authLink.concat(httpLink), 
  });
});
