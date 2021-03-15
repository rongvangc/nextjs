import React from "react";
import { Container, Grid } from "@material-ui/core";
import { useStore } from "./_app";

//Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Apollo
import { useQuery } from "@apollo/client";
import { FOOD_CATEGORIES } from "../queries/foodCategories";
import { initializeApollo } from "../apollo/client";

//Component
import Layout from "../components/layouts/Layout";
import FoodCatBox from "../components/UI/FoodCatBox/FoodCatBox";

const Foods = () => {
  const [store, updateStore] = useStore();
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

  const iconList = [
    "/icons/food.png",
    "/icons/prawn.png",
    "/icons/fruits.png",
    "/icons/grain.png",
    "/icons/meat.png",
    "/icons/vegetables.png",
  ];

  return (
    <Layout title="Foods">
      <Container>
        <Grid container justify="center" spacing={3}>
          <Grid item container spacing={2} lg={10}>
            {foodCategories?.map((foodCat, i) => (
              <Grid key={foodCat.node.id} item lg={2}>
                <FoodCatBox {...foodCat.node} icon={iconList[i]} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Foods;

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: FOOD_CATEGORIES,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};
