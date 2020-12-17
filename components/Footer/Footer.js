import React from "react";
import { Container, Grid } from "@material-ui/core";
import Link from "next/link";
import styles from "./Footer.module.css";

const Header = () => {
  return (
    <Container>
      <Grid container justify="space-between" className={styles.FooterContainer}>
        <Grid item lg={5}>
          <div className={styles.FooterBox}>
            <img src="/images/logo-light.png" alt="foodRecipe" />
            <p className={styles.Intro}>
              We want to show you another part of the platform ecosystem - admin
              panel for restaurant owners and employees that help to manage and
              control orders. This platform is suitable for a small and growing
              restaurant business.
            </p>
          </div>
        </Grid>
        <Grid item lg={3}>
          <div className={styles.FooterBox}>
            <h3 className={styles.FooterHeading}>
              Service
            </h3>
            <ul className={styles.MenuFooter}>
              <li>
                <Link href="/">Lorem link</Link>
              </li>
              <li>
                <Link href="/">Lorem link</Link>
              </li>
              <li>
                <Link href="/">Lorem link</Link>
              </li>
              <li>
                <Link href="/">Lorem link</Link>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item lg={3}>
          <div className={styles.FooterBox}>
            <h3 className={styles.FooterHeading}>
              About us
            </h3>
            <ul className={styles.MenuFooter}>
              <li>
                <Link href="/">Lorem link</Link>
              </li>
              <li>
                <Link href="/">Lorem link</Link>
              </li>
              <li>
                <Link href="/">Lorem link</Link>
              </li>
              <li>
                <Link href="/">Lorem link</Link>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
