import React, { useState } from 'react';
import Layout from '../components/layouts/Layout';
import { useStore } from './_app';

//Apollo
import { useQuery } from '@apollo/client';
import { CATEGORIES } from '../queries/categories';
import { MENU } from '../queries/category';
import { FOOD_RECIPE } from '../queries/foodRecipe';
import { initializeApollo } from '../apollo/client';

//Component
import Banner from '../components/HomePage/Banner/Banner';
import CategoriesList from '../components/HomePage/CategoriesList/CategoriesList';
import Intro from '../components/HomePage/Intro/Intro';
import Feature from '../components/HomePage/Feature/Feature';
import FoodRecipe from '../components/HomePage/FoodRecipe/FoodRecipe';

export default function Home() {
  const [ store, updateStore ] = useStore();
  const { categories } = store;
  const [ selectedTab, setSelectedTab ] = useState(null);

  const onCatChange = (slug) => {
    setSelectedTab(slug)
  }

  const { data } = useQuery(MENU ,{
    variables: {
      items: 4,
      catSlug: selectedTab
    }
  });

  const { data: foodRecipe } = useQuery(FOOD_RECIPE, {
    variables: {
      items: 3
    }
  })

  const { error, loading } = useQuery(CATEGORIES, {
    onCompleted: (data) => {
      setSelectedTab(data.productCategories.edges[0].node.slug)

      if(!store.categories) {
        updateStore({
          ...store,
          categories: data.productCategories.edges
        })
      }
    }
  })

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Layout home>
      <Banner />
      <CategoriesList />
      <Feature tab={selectedTab} products={data?.products.edges} categories={categories} onChangeTab={onCatChange}  />
      <Intro />
      <FoodRecipe foodRecipe={foodRecipe?.posts.edges} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: CATEGORIES
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  }
}