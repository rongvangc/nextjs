import React from 'react';
import { Container, AppBar, Grid } from '@material-ui/core';
import Link from 'next/link';
import styles from './Header.module.css';

import Navigation from './Navigation/Navigation';

const Header = () => {
  return (
    <AppBar className={styles.Header} position="fixed" color="inherit">
      <Container>
        <Grid container alignItems="center" className={styles.HeaderContainer}>
          <Grid item lg={3}>
            <Link href="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </Grid>
          <Grid item lg={9}>
            <Navigation />
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  )
}

export default Header;