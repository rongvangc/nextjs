import React from "react";
import { Container, Grid } from "@material-ui/core";
import { useStore } from './_app';

//Apollo
import { useQuery } from '@apollo/client';
import { FOOD_CATEGORIES } from '../queries/foodCategories';
import { initializeApollo } from '../apollo/client';

//Component
import Layout from "../components/layouts/Layout";
import FoodCatBox from '../components/UI/FoodCatBox/FoodCatBox';

const ItemFoodRecipe = () => {
  const [ store, updateStore ] = useStore();
  const { foodCategories } = store;
  const { error } = useQuery(FOOD_CATEGORIES, {
    onCompleted: (data) => {
      if (!store.foodCategories) {
        updateStore({
          ...store,
          foodCategories: data.categories.edges,
        });
      }
    },
  });

  if (error) return `Error! ${error.message}`;

  return (
    <Layout>
      <Container>
        <Grid container spacing={3}>
          <Grid item container spacing={2} lg={12}>
            {foodCategories?.map(foodCat => (
              <Grid item lg={3}>
                <FoodCatBox key={foodCat.node.id} {...foodCat.node} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ItemFoodRecipe;

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: FOOD_CATEGORIES
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

