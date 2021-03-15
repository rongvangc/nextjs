import React from "react";
import styles from "./ProductCard.module.css";
import PropTypes from 'prop-types';
import Link from "next/link";
import { useRouter } from "next/router";

import {
  AddIcon,
  RemoveIcon,
  AddToCart,
} from "../../../components/Icons/Icons";

const ProductCard = (props) => {
  const route = useRouter();

  let categoriesList = '';

  if(props.activeCat && props.productCategories) {
    categoriesList = props.productCategories?.edges[0].node.slug + '/'
  }

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
    <div className={styles.ProductCard} ref={props.lastRef}>
      <Link href={route.asPath + props.prefixUrl + '/' + categoriesList + props.slug} passHref>
        <ButtonCat />
      </Link>
      {!props.feature ? (
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
      ) : (
        <div className={styles.CardToolsFeature}>
          <button className={styles.TextAddToCart}>
            Add to card
          </button>
          <button className={styles.AddToCard}>
            <AddToCart />
          </button>
        </div>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  prefixUrl: PropTypes.string,
  activeCat: PropTypes.bool
};

ProductCard.defaultProps = {
  prefixUrl: '',
  activeCat: false
};

export default ProductCard;
