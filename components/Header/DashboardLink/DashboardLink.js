import React from 'react';
import Link from "next/link";
import styles from "./DashboardLink.module.css";

const DashboardLink = ({ title, icon, href }) => {
  const DashboardLink = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref} className={styles.DashboardLink}>
        <img className="svg-icon-small" src={icon} />
        <span>{title}</span>
      </a>
    );
  });

  return (
    <Link passHref href={href}>
      <DashboardLink />
    </Link>
  )
}

export default DashboardLink
