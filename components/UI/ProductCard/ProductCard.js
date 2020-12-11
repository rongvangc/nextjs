import React from "react";
import styles from "./ProductCard.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  AddIcon,
  RemoveIcon,
  AddToCart,
} from "../../../components/Icons/Icons";

const ProductCard = (props) => {
  const route = useRouter();

  const ButtonCat = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <div
        href={href}
        onClick={onClick}
        ref={ref}
        className={styles.ProductCardImg}
      >
        <img src={props.image?.sourceUrl} alt={props.image?.altText} />
        <h3>{props.name}</h3>
      </div>
    );
  });

  return (
    <div className={styles.ProductCard}>
      <Link
        href={route.asPath + "/" + props.slug}
        passHref
      >
        <ButtonCat />
      </Link>
      <div className={styles.CardTools}>
        <div className={styles.Amount}>
          <button className={styles.Amount_Add}>
            <AddIcon />
          </button>
          <span>1</span>
          <button className={styles.Amount_Remove}>
            <RemoveIcon />
          </button>
        </div>
        <div className={styles.Price}>
          <span>{props.price}</span>
          <button className={styles.AddToCard}>
            <AddToCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
