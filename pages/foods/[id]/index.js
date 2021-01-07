import React, { useRef, useCallback, useState } from "react";
import { Container, Grid, CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import { useStore } from "../../_app";

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
  const [loading, setLoading] = useState(false)
  const route = useRouter();
  const observer = useRef();
  
  const { data, error: errorFood, loading: loadingFood, fetchMore } = useQuery(
    FOOD_RECIPE,
    {
      variables: {
        items: 9,
        catSlug: route.query.id,
      }
    }
  );

  const lastBookElementRef = useCallback((node) => {
    if (loading || !data?.posts.pageInfo.hasNextPage) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("visible");
        setLoading(true)
        {data?.posts.pageInfo.hasNextPage ? setLoading(true) : setLoading(true)}
        fetchMore({
          variables: {
            items: 9,
            after: data?.posts.pageInfo.endCursor
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult || !prev.posts.pageInfo.hasNextPage ) return prev;
            // console.log(fetchMoreResult, prev);
            if (!prev.posts.pageInfo.hasNextPage ) return 
            return {
              posts: {
                __typename: "RootQueryToPostConnection",
                edges: [
                  ...prev.posts.edges,
                  ...fetchMoreResult.posts.edges
                ],
                pageInfo: fetchMoreResult.posts.pageInfo
              }
            }
          }
        })
        .then(() => setLoading(false))
      }
    }, [loading]);
    if (node) observer.current.observe(node);
  });



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
          <Grid item lg={9} onScroll={(e) => console.log(e)}>
            <Grid container>
              {!loadingFood ? (
                data?.posts.edges.map((product) => {
                  return (
                    <Grid key={product.node.id} item lg={4}>
                      <RecipeCard
                        lastRef={lastBookElementRef}
                        {...product.node}
                      />
                    </Grid>
                  );
                })
              ) : (
                <CircularProgress className="Spinner" />
              )}
              {loading && <CircularProgress className="Spinner" />}
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
