import React from 'react';
import styles from './Navigation.module.css';
import Link from 'next/link';

import { MENU } from '../../../constants';

const Navigation = () => {
  return (
    <div className={styles.Navigation}>
      <div className={styles.Menu}>
        <ul>
          {MENU.map(item => (
            <li key={item.name}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.User}>
        <ul>
          <li>
            <Link href="/cart">
              <img className="svg-icon" src="/images/cart.svg" />
            </Link>
          </li>
          <li>            
            <Link href="/account">
              <img className="svg-icon" src="/images/user.svg" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navigation