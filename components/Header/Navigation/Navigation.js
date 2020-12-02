import React from 'react';
import styles from './Navigation.module.css';
import { useStore } from '../../../pages/_app';

import { MENU } from '../../../constants';

const Navigation = () => {
  return (
    <div className={styles.Navigation}>
      <div className={styles.Menu}>
        <ul>
          {MENU.map(item => (
            <li key={item.name}>
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.User}>
        <a href="cart">
          <img className="svg-icon" src="/images/cart.svg" />
        </a>
        <a href="account">
          <img className="svg-icon" src="/images/user.svg" />
        </a>
      </div>
    </div>
  )
}

export default Navigation