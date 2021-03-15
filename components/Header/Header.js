import React, { useState, useEffect } from 'react';
import { Container, AppBar, Grid } from '@material-ui/core';
import Link from 'next/link';
import styles from './Header.module.css';
import { getLocal } from "../../utils/utils";
import { useRouter } from 'next/router';

import Navigation from './Navigation/Navigation';

import { initializeApollo } from '../../apollo/client'

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const apolloClient = initializeApollo();
  const route = useRouter()

  useEffect(() => {
    const token = getLocal("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const onLogout = () => {
    console.log('LOGOUT');
    localStorage.clear();
    apolloClient.resetStore();
    route.push('/');
  }

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
            <Navigation isLogin={isLogin} onLogout={onLogout} />
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  )
}

export default Header;