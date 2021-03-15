import React from "react";
import { Container, Grid } from "@material-ui/core";
import styles from "./Item.module.css";
import moment from 'moment';

//Apollo
import { FOOD } from "../../../queries/food";
import { initializeApollo } from "../../../apollo/client";

//Component
import Layout from "../../../components/layouts/Layout";
import SideBarFoodRecipe from '../../../components/SideBar/SideBarFoodRecipe';

export const getServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: FOOD,
    variables: {
      catSlug: params.post,
    },
  });

  return {
    props: {
      itemData: data,
    },
  };
};

const ItemFoodRecipe = ({ itemData }) => {

  const {
    title,
    content,
    foodRecipe,
    date,
    author,
    tags,
    featuredImage,
  } = itemData.post;

  const DateFormat = moment(date).format("MMM Do YY");

  return (
    <Layout title={title}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={8}>
            <div className={styles.ImageContainer}>
              <img src={featuredImage?.node.sourceUrl} alt="" />
              <div className={styles.Author}>
                <h3>{title}</h3>
                <p>
                  {author.node.name} - <span>{DateFormat}</span>
                </p>
              </div>
            </div>

            <div className={styles.Directions}>
              <div className={styles.Left}>
                <h4 className={styles.Heading}>Ingredients</h4>
                <ul>
                  {foodRecipe.ingredients?.map((ingredient, i) => (
                    <li key={i}>{ingredient.item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.Right}>
                <h4 className={styles.Heading}>Directions</h4>
                <ul>
                  {foodRecipe.directions?.map((direction, i) => (
                    <li key={i}><span>{i + 1}</span>{direction.item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.ContentContainer}>
              <h4 className={styles.Heading}>Details</h4>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </Grid>
          <Grid item lg={4}>
            <SideBarFoodRecipe />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ItemFoodRecipe;
