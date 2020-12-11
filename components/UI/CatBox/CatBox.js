import React from "react";
import styles from "./CatBox.module.css";
import Link from "next/link";

const CatBox = ({ title, imgUrl, alt, slug }) => {
  const ButtonCat = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref} className={styles.CatBox}>
        <div className={styles.CatBoxImg}>
          <img src={imgUrl} alt={alt} />
        </div>
        <h4 className={styles.CatBoxHeading}>{title}</h4>
      </a>
    );
  });

  return (
    <Link passHref href={`/menu/${slug}`}>
      <ButtonCat />
    </Link>
  );
};

export default CatBox;
