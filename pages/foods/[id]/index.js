import React from "react";
import { Container, Grid, CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import { useStore } from "../../_app";
import styles from "./Item.module.css";

//Apollo
import { useQuery } from "@apollo/client";
import { FOOD_CATEGORIES } from "../../../queries/foodCategories";
import { FOOD_RECIPE } from "../../../queries/foodRecipe";
import { initializeApollo } from "../../../apollo/client";

//Component
import Layout from "../../../components/layouts/Layout";
import SideBarFood from "../../../components/SideBar/SideBarFood";
import { capitalizeFirstLetter } from "../../../utils/utils";
import RecipeCard from "../../../components/UI/RecipeCard/RecipeCard";

const apolloClient = initializeApollo();

const ItemFoodRecipe = () => {
  const [store, updateStore] = useStore();

  const route = useRouter();

  const { data, error: errorFood, loading: loadingFood } = useQuery(
    FOOD_RECIPE,
    {
      variables: {
        items: 20,
        catSlug: route.query.id,
      },
    }
  );

  const { error: errorCat, loading: loadingCat } = useQuery(FOOD_CATEGORIES, {
    onCompleted: (data) => {
      if (!store.foodCategories) {
        updateStore({
          ...store,
          foodCategories: data.categories.edges,
        });
      }
    },
  });

  if (errorCat || errorFood) return `Error! ${error.message}`;

  return (
    <Layout title={`Foods - ${capitalizeFirstLetter(route.query.id)}`}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={3}>
            {!loadingCat ? <SideBarFood /> : <p>Loading...</p>}
          </Grid>
          <Grid item lg={9}>
            <Grid container>
              {!loadingFood ? (
                data?.posts.edges.map((product) => (
                  <Grid key={product.node.id} item lg={4}>
                    <RecipeCard {...product.node} />
                  </Grid>
                ))
              ) : (
                <CircularProgress className="Spinner" />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ItemFoodRecipe;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query({
    query: FOOD_CATEGORIES,
  });

  const paths = data.categories.edges.map((cat) => ({
    params: { id: cat.node.slug },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  await apolloClient.query({
    query: FOOD_CATEGORIES,
    variables: {
      catSlug: params.id,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};
