import '../styles/globals.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Store from '../context/store';

const defaultStore = {
  age: 45,
  name: "tsst"
}

const StoreProvide = Store(defaultStore);

function MyApp({ Component, pageProps }) {
  const theme = createMuiTheme({
    palette: {}
  });

  return (
    <ThemeProvider theme={theme}>
      <StoreProvide.prodiveData>
        <Component {...pageProps} />
      </StoreProvide.prodiveData>
    </ThemeProvider>
  )
}

export const useStore = StoreProvide.useData;

export default MyApp
