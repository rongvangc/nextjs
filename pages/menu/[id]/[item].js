import React from "react";
import client from "../../../apollo/client";
import { Container, Grid } from "@material-ui/core";

import { PRODUCT } from "../../../queries/product";
import Layout from "../../../components/layouts/Layout";

const ItemProduct = ({ itemData }) => {
  const { image, name, price, slug, sku, id } = itemData.product;

  return (
    <Layout title={name}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <h1>{name}</h1>
            <p>{price}</p>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ItemProduct;

export const getServerSideProps = async ({ params }) => {
  console.log(params);
  const { data } = await client.query({
    query: PRODUCT,
    variables: {
      catSlug: params.item,
    },
  });

  return {
    props: {
      itemData: data,
    },
  };
};
