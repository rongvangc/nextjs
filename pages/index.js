import React from 'react';
import Layout from '../components/layouts/Layout';
import { useStore } from './_app';

//Apollo
import { useQuery } from '@apollo/client';
import { CATEGORIES } from '../queries/categories';
import { initializeApollo } from '../apollo/client';

//Component
import Banner from '../components/HomePage/Banner/Banner';
import CategoriesList from '../components/HomePage/CategoriesList/CategoriesList';


export default function Home() {
  const [ store, updateStore ] = useStore();
  const { error, loading } = useQuery(CATEGORIES, {
    onCompleted: (data) => {
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