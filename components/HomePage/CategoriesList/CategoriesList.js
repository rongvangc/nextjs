import React from "react";
import { useStore } from "../../../pages/_app";

import { Container, Grid } from "@material-ui/core";
import { Heading } from "../../UI/Heading/Heading";
import CatBox from '../../../components/UI/CatBox/CatBox';

const CategoriesList = () => {
  const [store] = useStore();
  const { categories } = store;

  return (
    <Container>
      <Grid container>
        <Grid item lg={12}>
          <Heading>Our Menu</Heading>
        </Grid>
        <Grid item lg={12} container justify="center" alignItems="center" direction="row">
          {categories.map((cat) => (
            <CatBox
              key={cat.node.id}
              title={cat.node.name}
              slug={cat.node.slug}
              imgUrl={cat.node.image.sourceUrl}
              alt={cat.node.image.title}
            />
          ))}
        </Grid>
      </Grid>

    </Container>
  );
};

export default CategoriesList;
