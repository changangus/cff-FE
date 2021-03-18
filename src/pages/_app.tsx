
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider, createClient } from 'urql';
import { theme } from '../styles/globalTheme';

const client = createClient({ 
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>

    )
}

export default MyApp
