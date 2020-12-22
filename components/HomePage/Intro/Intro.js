import React from "react";
import { Container, Grid } from "@material-ui/core";
import styles from "./Intro.module.css";

//Component
import { Heading } from "../../UI/Heading/Heading";

const Intro = () => {
  return (
    <Container className="Section">
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <Heading>Quality & Sourcing</Heading>
          <p className="DescriptionHeading">
            We deliver fresh and healthy meals to help you eal well-and feel
            great-every day.
          </p>
        </Grid>
        <Grid item lg={12} container>
          <Grid item lg={6}>
            <div className={styles.ImageContainer}>
              <img src="/images/intro.png" alt="Intro" />
            </div>
          </Grid>
          <Grid item lg={6}>
            <div className={styles.IntroContainer}>
              <h4>We handpick a thoughtful</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
              <div className={styles.Signal}>Shyn</div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Intro;
