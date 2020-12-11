import React from "react";
import client from "../apollo/client";
import { Container, Grid } from "@material-ui/core";

import { MENU } from "../queries/category";
import Layout from "../components/layouts/Layout";
import ProductCard from '../components/UI/ProductCard/ProductCard';
import SideBar from '../components/SideBar/SideBar';

const Menu = ({ menu }) => {

  return (
    <Layout title="Menu">
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={3}>
            <SideBar />
          </Grid>
          <Grid item lg={9}>
            <Grid container spacing={3}>
              {menu.products.edges.map(product => (
                <Grid item lg={4}>
                  <ProductCard key={product.node.id} {...product.node} />
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

export const getServerSideProps = async () => {
  const { data } = await client.query({
    query: MENU,
    variables: {
      items: 20,
    },
  });

  return {
    props: {
      menu: data,
    },
  };
};
