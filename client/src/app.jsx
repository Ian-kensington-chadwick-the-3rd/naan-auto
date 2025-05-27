
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
import videoBackground from './assets/whitebg.mp4'
// '/graphql'
console.log(url )
const url = import.meta.env.VITE_GRAPHQL_URI || '/graphql'
const httpLink = createHttpLink({
  uri: url,
  credentials:'include',
});

// const authLink = setContext((_, { headers }) => {
  
//   const token = localStorage.getItem('token');

//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });



const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='app'>
        <video autoPlay muted loop className='video-background' type='video/mp4'>
          <source src={videoBackground} />
        </video>
        <Header />
        <Outlet />
        <Footer />
      </div>

    </ApolloProvider>
  )
}

export default App;