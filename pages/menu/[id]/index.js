import React from "react";
import { Container, Grid, CircularProgress } from "@material-ui/core";
import { useRouter } from 'next/router';
import { useStore } from '../../_app';
import styles from './Item.module.css';

//Apollo
import { useQuery } from '@apollo/client';
import { MENU } from '../../../queries/category';
import { CATEGORIES } from '../../../queries/categories';
import { initializeApollo } from '../../../apollo/client';

//Component
import Layout from "../../../components/layouts/Layout";
import ProductCard from '../../../components/UI/ProductCard/ProductCard';
import SideBar from '../../../components/SideBar/SideBar';
import { capitalizeFirstLetter } from '../../../utils/utils';

const apolloClient = initializeApollo();

const MenuItems = () => {
  const route = useRouter();

  const [ store, updateStore ] = useStore();
  
  const { data: dataMenu, error: errorMenu, loading: loadingMenu } = useQuery(
    MENU,
    {
      variables: {
        items: 20,
        catSlug: route.query.id
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
    <Layout title={`Menu - ${capitalizeFirstLetter(route.query.id)}`}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={3}>
            {!loadingCat ? <SideBar /> : <p>Loading...</p>}
          </Grid>
          <Grid item lg={9}>
            <Grid container item>
              {!loadingMenu ?
                dataMenu?.products.edges.map((product) => (
                  <Grid item lg={4} key={product.node.id}>
                    <ProductCard {...product.node} />
                  </Grid>
                )) : <CircularProgress className="Spinner" />}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default MenuItems;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query({
    query: CATEGORIES,
  });

  const paths = data.productCategories.edges.map((cat) => ({
    params: { id: cat.node.slug },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {

  await apolloClient.query({
    query: CATEGORIES
  })

  await apolloClient.query({
    query: MENU,
    variables: {
      items: 20,
      catSlug: params.id
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}
