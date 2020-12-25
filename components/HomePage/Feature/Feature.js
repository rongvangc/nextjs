import React from "react";
import { Container, Grid } from "@material-ui/core";

//Component
import FeatureProduct from '../../UI/FeatureProduct/FeatureProduct';
import { Heading } from "../../UI/Heading/Heading";

const Feature = ({ tab, products, categories, onChangeTab }) => {

  return (
    <Container className="Section">
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <Heading>Popular foods</Heading>
        </Grid>
        <Grid item lg={12}>
          <FeatureProduct tab={tab} products={products} categories={categories} onChangeTab={onChangeTab} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Feature;
