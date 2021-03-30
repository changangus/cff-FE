
import { ThemeProvider } from '@material-ui/core/styles';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import Navbar from '../components/Navbar';
import { theme } from '../styles/globalTheme';
import { createUrqlClient } from '../utils/createUrqlClient';

function MyApp({ Component, pageProps }: any) {
  return (
      <ThemeProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    )
}

export default withUrqlClient(createUrqlClient)(MyApp)
