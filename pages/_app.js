import React, { useEffect } from 'react'
import "../styles/globals.css";
import "../css/main.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/client";

import client from "../apollo/client";
import Store from "../context/store";
import { GET_MENU } from "../queries/menu";

const defaultStore = {
  age: 45,
  name: "tsst",
};

const StoreProvide = Store(defaultStore);

export const useStore = StoreProvide.useData;
export default function MyApp({ Component, pageProps }) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#FF614A",
        yellow: "#FFDE68",
        cyan: "#CCE8F1",
      },
      text: {
        primary: "#353B1C",
        secondary: "#F9FAFA",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <StoreProvide.provideData>
          <Component {...pageProps} />
        </StoreProvide.provideData>
      </ApolloProvider>
    </ThemeProvider>
  );
}

// MyApp.getInitialProps = async () => {
//   const { data } = await client.query({
//     query: GET_MENU
//   });

//   return { menus: data }
// }

