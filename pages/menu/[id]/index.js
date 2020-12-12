import React from "react";
import { Container, Grid } from "@material-ui/core";
import client from '../../../apollo/client';
import { useRouter } from 'next/router';

import { MENU } from '../../../queries/category';
import Layout from "../../../components/layouts/Layout";
import ProductCard from '../../../components/UI/ProductCard/ProductCard';
import SideBar from '../../../components/SideBar/SideBar';


const MenuItems = ({ menu }) => {
  const route = useRouter();

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
              {menu.products.edges.map(product => (
                <Grid item lg={4}>
                  <ProductCard key={product.node.id} {...product.node} />
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

export const getServerSideProps = async ({ params }) => {
  // console.log(params);
  const { data } = await client.query({
    query: MENU,
    variables: {
      items: 20,
      catSlug: params.id
    },
  });

  return {
    props: {
      menu: data,
    },
  };
};


// export const getStaticPaths = async () => {
//   const [store] = useStore();

//   console.log(store);

//   // const paths = countries.map((country) => ({
//   //   params: { id: country.alpha3Code },
//   // }));

//   // return {
//   //   paths,
//   //   fallback: false,
//   // };
// }

// export const getStaticProps = async ({ params }) => {
//   // const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${params.id}`);
//   // const country = await res.json();

//   const country = await getCountry(params.id);

//   return {
//     props: {
//       country,
//     },
//   };
// }