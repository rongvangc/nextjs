import React, { useCallback, useRef, useState } from "react";
import { Container, Grid, CircularProgress } from "@material-ui/core";
import { useRouter } from 'next/router';
import { useStore } from '../../_app';

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
  const [loading, setLoading] = useState(false)
  const observer = useRef();

  const [ store, updateStore ] = useStore();
  
  const { data: dataMenu, error: errorMenu, loading: loadingMenu, fetchMore } = useQuery(
    MENU,
    {
      variables: {
        items: 9,
        catSlug: route.query.id
      }
    }
  );

  const lastBookElementRef = useCallback((node) => {
    if (loading || !dataMenu?.products.pageInfo.hasNextPage) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("ACTIVE INFINITE LOAD");
        setLoading(true)
        {dataMenu?.products.pageInfo.hasNextPage ? setLoading(true) : setLoading(true)}
        fetchMore({
          variables: {
            items: 9,
            after: dataMenu?.products.pageInfo.endCursor
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult || !prev.products.pageInfo.hasNextPage ) return prev;

            if (!prev.products.pageInfo.hasNextPage ) return 
            return {
              products: {
                __typename: "RootQueryToProductConnection",
                edges: [
                  ...prev.products.edges,
                  ...fetchMoreResult.products.edges
                ],
                pageInfo: fetchMoreResult.products.pageInfo
              }
            }
          }
        })
        .then(() => setLoading(false))
      }
    }, [loading]);
    if (node) observer.current.observe(node);
  });

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
            <Grid container spacing={3}>
              {!loadingMenu ?
                dataMenu?.products.edges.map((product) => (
                  <Grid item lg={4} key={product.node.id}>
                    <ProductCard lastRef={lastBookElementRef} {...product.node} />
                  </Grid>
                )) : <CircularProgress className="Spinner" />}
              {loading && <CircularProgress className="Spinner" />}
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
