import React from "react";
import { useStore } from "../../../pages/_app";
import styles from "./CategoriesList.module.css";

import { Container, Grid } from "@material-ui/core";
import { Heading } from "../../UI/Heading/Heading";

const CategoriesList = () => {
  const [store] = useStore();
  const { categories } = store;

  const CatBox = ({ title, imgUrl, alt, slug }) => (
    <a href={`/menu/${slug}`} className={styles.CatBox}>
      <div className={styles.CatBoxImg}>
        <img src={imgUrl} alt={alt} />
      </div>
      <h4 className={styles.CatBoxHeading}>{title}</h4>
    </a>
  );

  return (
    <Container>
      <Grid container>
        <Grid item lg={12}>
          <Heading>Our Menu</Heading>
        </Grid>
        <Grid item lg={12} justify="center" alignItems="center">
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
