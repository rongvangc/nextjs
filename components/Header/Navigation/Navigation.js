import React from "react";
import styles from "./Navigation.module.css";
import Link from "next/link";
import DashboardLink from "../DashboardLink/DashboardLink";

import { MENU } from "../../../constants";

const Navigation = ({ isLogin, onLogout }) => {
  return (
    <div className={styles.Navigation}>
      <div className={styles.Menu}>
        <ul>
          {MENU.map((item) => (
            <li key={item.name}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.User}>
        <ul>
          {isLogin ? (
            <>
              <li>
                <Link href="/cart">
                  <img className="svg-icon" src="/images/cart.svg" />
                </Link>
              </li>
              <li className={styles.UserHover}>
                <Link href="/account">
                  <img className="svg-icon" src="/images/user.svg" />
                </Link>
                <ul className={styles.MiniDashBoard}>
                  <li>  
                    <DashboardLink
                      title="Profile"
                      href="dashboard"
                      icon="/images/profile.svg"
                    />
                  </li>
                  <li>  
                    <DashboardLink
                      title="Acount"
                      href="dashboard"
                      icon="/images/user.svg"
                    />
                  </li>
                  <li>  
                    <DashboardLink
                      title="Setting"
                      href="dashboard"
                      icon="/images/setting.svg"
                    />
                  </li>
                  <div className={styles.Logout} onClick={onLogout} >
                    <img src="/images/logout.svg" />
                    <span>Logout</span>
                  </div>
                </ul>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                <img className="svg-icon" src="/images/user.svg" />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
