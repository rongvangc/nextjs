import React, { Fragment } from 'react';
import Head from 'next/head';
import client from '../../apollo/client';

import { SETTINGS } from '../../queries/setting';
import Header from '../Header/Header';

const Layout = ({ title, home, children }) => {

  return (
    <Fragment>
      {home ? (
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      ) : (
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}
      <Header />
      <main style={{ paddingTop: 60, height: 2000 }}>{children}</main>
    </Fragment>
  )
}

export default Layout;