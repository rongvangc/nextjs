import React from "react";
import PropTypes from 'prop-types';
import styles from "./RecipeCard.module.css";
import { UserIcon, TimeIcon } from "../../Icons/Icons";
import Link from 'next/link';
import { useRouter } from "next/router";

const RecipeCard = (props) => {
  const route = useRouter();
  const { title, featuredImage, foodRecipe, slug, lastRef, categories, prefixUrl, activeCat } = props;

  let itemPerson = [];

  for (let index = 0; index < foodRecipe.person; index++) {
    itemPerson.push(index);
  }

  let categoriesList = '';

  if(activeCat && categories) {
    categoriesList = categories?.edges[0].node.slug + '/'
  }

  const checkPerson = () => {
    if (itemPerson.length <= 2) {
      return itemPerson?.map((_, i) => <UserIcon key={i} />);
    } else {
      const number = (itemPerson.length - 1).toString();
      return (
        <>
          <UserIcon />
          +{number}
        </>
      );
    }
  };

  return (
    <Link href={route.asPath + prefixUrl + "/" + categoriesList + slug}>
      <div ref={lastRef} className={styles.RecipeCard}>
        <div className={styles.ImageContainer}>
          <img src={featuredImage?.node.sourceUrl} alt="" />
          <div className={styles.Content}>
            <div className={styles.Item}>{checkPerson()}</div>
            <div className={styles.Item}>
              <TimeIcon />
              <span>{foodRecipe.time}</span>
            </div>
          </div>
        </div>

        <h4 className={styles.Title}>{title}</h4>
      </div>
    </Link>
  );
};

RecipeCard.propTypes = {
  prefixUrl: PropTypes.string,
  activeCat: PropTypes.bool
};

RecipeCard.defaultProps = {
  prefixUrl: '',
  activeCat: false
};

export default RecipeCard;
