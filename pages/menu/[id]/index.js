import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import client from '../../../apollo/client';
import { useRouter } from 'next/router';

import { useStore } from '../../_app';
import { MENU } from '../../../queries/category';
import { CATEGORIES } from '../../../queries/categories';
import Layout from "../../../components/layouts/Layout";
import ProductCard from '../../../components/UI/ProductCard/ProductCard';
import SideBar from '../../../components/SideBar/SideBar';


const MenuItems = ({ menu, categories }) => {
  const route = useRouter();
  const [ store, updateStore ] = useStore();

  useEffect(() => {
    if(!store.categories) {
      updateStore({
        ...store,
        categories: categories
      })
    }
  }, [])

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Layout title={`Menu - ${capitalizeFirstLetter(route.query.id)}`}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={3}>
            <SideBar />
          </Grid>
          <Grid item lg={9}>
            <Grid container spacing={3}>
              {menu?.products.edges.map(product => (
                <Grid item lg={4} key={product.node.id}>
                  <ProductCard {...product.node} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default MenuItems;

export const getStaticPaths = async () => {
  console.log('run')
  const { data } = await client.query({
    query: CATEGORIES,
  });

  console.log(data);

  const paths = data.productCategories.edges.map((cat) => ({
    params: { id: cat.slug },
  }));

  // return {
  //   paths: paths,
  //   fallback: false,
  // };
}

export const getStaticProps = async () => {

  const { data } = await client.query({
    query: MENU,
    variables: {
      items: 20,
      // catSlug: params.id
    },
  });

  return {
    props: {
      menu: data
    },
  };
};
