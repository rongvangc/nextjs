import React, { useEffect } from 'react';
import Layout from '../components/layouts/Layout';
import { useStore } from './_app';
import client from '../apollo/client';
import { CATEGORIES } from '../queries/categories';

//Component
import Banner from '../components/HomePage/Banner/Banner';
import CategoriesList from '../components/HomePage/CategoriesList/CategoriesList';

export default function Home({ categories }) {
  const [ store, updateStore ] = useStore();

  console.log(categories)

  useEffect(() => {
    if(!store.categories) {
      updateStore({
        ...store,
        categories: categories
      })
    }
  }, [])

  return (
    <Layout home>
      <Banner />
      <CategoriesList />
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const { data } = await client.query({
    query: CATEGORIES,
  });

  return {
    props: {
      categories: data.productCategories.edges
    }
  }
};