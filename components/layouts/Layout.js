import React, { Fragment } from 'react';
import Head from 'next/head';
import styles from './Layout.module.css';

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
      
      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </Fragment>
  )
}

export default Layout;