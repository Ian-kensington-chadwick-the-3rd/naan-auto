
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from "@apollo/client/link/context";
import { Outlet } from 'react-router-dom';
import Header from './components/header'
import Footer from './components/footer'
const httpLink = createHttpLink({
    uri: '/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  


  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

function App(){
    return(
      <ApolloProvider client={client}>
        <div className='min-100-vh'>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </ApolloProvider>
    )
}

export default App;