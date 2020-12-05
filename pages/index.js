import React from 'react';
import Layout from '../components/layouts/Layout';
import { useStore } from './_app';

//Component
import Banner from '../components/HomePage/Banner/Banner';
import CategoriesList from '../components/HomePage/CategoriesList/CategoriesList';

export default function Home() {
  const [ store ] = useStore();

  console.log(store);

  return (
    <Layout home>
      <Banner />
      <CategoriesList />
    </Layout>
  )
}