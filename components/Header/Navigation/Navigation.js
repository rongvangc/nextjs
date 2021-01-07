import React, { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import Link from 'next/link';
import { getLocal } from '../../../utils/utils';

import { MENU } from '../../../constants';

const Navigation = () => {
  const [ isLogin, setIsLogin ] = useState(false)

  useEffect(() => {
    const token = getLocal('token');
    if(token) {
      setIsLogin(true)
    }
  }, [])

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
          {isLogin ? 
          <><li>
            <Link href="/cart">
              <img className="svg-icon" src="/images/cart.svg" />
            </Link>
          </li>
          <li>            
            <Link href="/account">
              <img className="svg-icon" src="/images/user.svg" />
            </Link>
          </li></> : <li>            
            <Link href="/login">
              <img className="svg-icon" src="/images/user.svg" />
            </Link>
          </li>}
        </ul>
      </div>
    </div>
  )
}

export default Navigation