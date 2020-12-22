import React from "react";
import { Container, Grid } from "@material-ui/core";
import { useStore } from "./_app";

//Apollo
import { MENU } from "../queries/category";
import { CATEGORIES } from "../queries/categories";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo/client";

//Component
import Layout from "../components/layouts/Layout";
import ProductCard from "../components/UI/ProductCard/ProductCard";
import SideBar from "../components/SideBar/SideBar";

const Menu = () => {
  const [ store, updateStore ] = useStore();
  const { data: dataMenu, error: errorMenu, loading: loadingMenu } = useQuery(
    MENU,
    {
      variables: {
        items: 20,
      }
    }
  );

  const { error: errorCat, loading: loadingCat } = useQuery(CATEGORIES, {
    onCompleted: (data) => {
      if (!store.categories) {
        updateStore({
          ...store,
          categories: data.productCategories.edges,
        });
      }
    },
  });

  if (errorCat || errorMenu) return `Error! ${error.message}`;

  return (
    <Layout title="Menu">
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={3}>
            {!loadingCat ? <SideBar /> : <p>Loading...</p>}
          </Grid>
          <Grid item lg={9}>
            <Grid container spacing={3}>
              {!loadingMenu &&
                dataMenu?.products.edges.map((product) => (
                  <Grid item lg={4} key={product.node.id}>
                    <ProductCard {...product.node} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Menu;

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: CATEGORIES
  })

  await apolloClient.query({
    query: MENU,
    variables: {
      items: 20
    }
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1,
  }
}
