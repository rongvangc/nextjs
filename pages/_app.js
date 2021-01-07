import React from 'react'
import "../styles/globals.css";
import "../css/main.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from '@material-ui/core';
import { ApolloProvider } from "@apollo/client";
import { useApollo } from '../apollo/client';
import { Provider } from 'next-auth/client'

import Store from "../context/store";

const defaultStore = {
  age: 45,
  name: "tsst",
};

let StoreProvide = Store(defaultStore);
// let StoreProvide Hoặc khai báo rỗng như vậy

export const useStore = StoreProvide.useData;

export default function MyApp({ Component, pageProps }) {
  const theme = createMuiTheme({
    overrides: {
      MuiScopedCssBaseline: {
        '@global': {
          html: {
            WebkitFontSmoothing: 'auto'
          },
        }
      },
    },
    palette: {
      primary: {
        main: "#FF614A",
        yellow: "#FFDE68",
        cyan: "#CCE8F1",
      },
      secondary: {
        main: "#FF614A"
      },
      text: {
        primary: "#353B1C",
        secondary: "#F9FAFA",
      },
    },
    typography: {
      fontFamily: [
        'Baloo 2 ', 
        'cursive',
      ].join(',')
    }
  });

  const store = useApollo(pageProps.initialApolloState);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={store}>
        <StoreProvide.provideData>
          <Provider session={pageProps.session}>
            <Component {...pageProps} />
          </Provider>
        </StoreProvide.provideData>
      </ApolloProvider>
    </ThemeProvider>
  );
}