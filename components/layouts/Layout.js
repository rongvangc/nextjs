import React, { Fragment } from 'react';
import Head from 'next/head';
import styles from './Layout.module.css';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = ({ title, home, children }) => {
  return (
    <Fragment>
      {home ? (
        <Head>
          <title>Food App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      ) : (
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}
      <Header />
      
      <main onScroll={e => console.log(e)} className={styles.main}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <Footer />
      </footer>

    </Fragment>
  )
}

export default Layout;