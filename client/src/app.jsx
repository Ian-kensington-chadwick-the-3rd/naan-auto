
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { Outlet } from 'react-router-dom';
import Header from './components/header'
import Footer from './components/footer'
const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const client = new ApolloClient({
    link: httpLink,
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