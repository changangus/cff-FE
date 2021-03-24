
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Provider, createClient } from 'urql';
import Navbar from '../components/Navbar/Navbar';
import { theme } from '../styles/globalTheme';

const client = createClient({ 
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  }
});

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>

    )
}

export default MyApp
