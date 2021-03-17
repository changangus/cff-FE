import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../styles/globalTheme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
    )
}

export default MyApp
