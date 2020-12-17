import React from "react";
import client from "../../../apollo/client";
import { Container, Grid, Button } from "@material-ui/core";
import styles from './Item.module.css';

import { PRODUCT } from "../../../queries/product";
import Layout from "../../../components/layouts/Layout";

export const getServerSideProps = async ({ params }) => {

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

const ItemProduct = ({ itemData }) => {

  console.log(itemData);

  const { image, name, price, slug, sku, id, shortDescription } = itemData.product;

  return (
    <Layout title={name}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={8}>
            <div className={styles.ProductContainer}>
              <div className={styles.ProductImage}>
                <img src={image?.sourceUrl} alt="" />
              </div>
              <div className={styles.ProductDetails}>
                <div class={styles.Top}>
                  <h1 className={styles.Heading}>{name}</h1>
                  <span className={styles.Sku}>Sku: {sku}</span>
                  <p className={styles.Price}>{price}</p>
                </div>
                <Button variant="contained" color="primary" className={styles.ButtonBuy}>
                  Buy Now
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item lg={4}>
            <div className={styles.Sidebar} >
              <h3 className={styles.Heading}>Sidebar</h3>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item lg={8}>
            <div className={styles.ProductDescription} >
              <h3 className={styles.Heading}>Details</h3>
              <div className={styles.Content} dangerouslySetInnerHTML={{ __html: shortDescription }} />
            </div>
          </Grid>
          <Grid item lg={4}>
            <div className={styles.ContentSidebar} >
              <h3 className={styles.Heading}>Content Sidebar</h3>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ItemProduct;