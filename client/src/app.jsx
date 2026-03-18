
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { Helmet } from 'react-helmet';

import { setContext } from "@apollo/client/link/context";
import { Outlet } from 'react-router-dom';
import Header from './components/header'
import Footer from './components/footer'
import videoBackground from './assets/whitebg.mp4'
// '/graphql'

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

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": ["AutoDealer", "LocalBusiness"],
  "name": "Naan Auto",
  "url": "https://naanauto.com",
  "telephone": "+1-850-861-5000",
  "email": "naanauto@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "4327 Gulf Breeze Parkway",
    "addressLocality": "Gulf Breeze",
    "addressRegion": "FL",
    "postalCode": "32563",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.3929398,
    "longitude": -87.0428434
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "11:00", "closes": "17:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "12:00", "closes": "17:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "11:00", "closes": "17:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "11:00", "closes": "17:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "11:00", "closes": "17:00" }
  ],
  "priceRange": "$$",
  "servesCuisine": null,
  "areaServed": ["Gulf Breeze, FL", "Pensacola, FL"],
  "description": "Family-owned used car dealership in Gulf Breeze, FL serving Pensacola and surrounding areas. Honest pricing, quality vehicles, no gimmicks."
};

function App() {
  return (
    <ApolloProvider client={client}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>
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