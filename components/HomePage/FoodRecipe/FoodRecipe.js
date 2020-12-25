import React from "react";
import { Container, Grid, CircularProgress } from "@material-ui/core";
import styles from './FoodRecipe.module.css';

//Component
import { Heading } from "../../UI/Heading/Heading";
import RecipeCard from '../../UI/RecipeCard/RecipeCard';

const FoodRecipe = ({ foodRecipe }) => {
  return (
    <Container className="Section">
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <Heading>Foods Recipe</Heading>
          <p className="DescriptionHeading">
            We deliver fresh and healthy meals to help you eal well-and feel
            great-every day.
          </p>
        </Grid>
        <Grid item lg={12}>
          <div className={styles.FoodRecipe}>
            {foodRecipe ? foodRecipe.map(recipe => (
              <Grid key={recipe.node.id} item lg={3}>
                <RecipeCard {...recipe.node} />
              </Grid>
            )) : <CircularProgress className="Spinner" />}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FoodRecipe;
