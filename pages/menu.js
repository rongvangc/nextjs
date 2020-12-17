import React, { useEffect } from "react";
import client from "../apollo/client";
import { Container, Grid } from "@material-ui/core";

import { useStore } from './_app';
import { MENU } from "../queries/category";
import { CATEGORIES } from '../queries/categories';
import Layout from "../components/layouts/Layout";
import ProductCard from '../components/UI/ProductCard/ProductCard';
import SideBar from '../components/SideBar/SideBar';

export const getStaticProps = async () => {

  const { data } = await client.query({
    query: MENU,
    variables: {
      items: 20,
    },
  });

  const { data: catProduct } = await client.query({
    query: CATEGORIES,
  }); 

  return {
    props: {
      menu: data,
      categories: catProduct.productCategories.edges
    },
  };
};

const Menu = ({ menu, categories }) => {
  const [ store, updateStore ] = useStore();

  useEffect(() => {
    if(!store.categories) {
      updateStore({
        ...store,
        categories: categories
      })
    }
  }, [])

  return (
    <Layout title="Menu">
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={3}>
            <SideBar />
          </Grid>
          <Grid item lg={9}>
            <Grid container spacing={3}>
              {menu?.products.edges.map(product => (
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
