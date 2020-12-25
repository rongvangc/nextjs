import React from "react";
import Link from "next/link";
import styles from "./FoodRecipe.module.css";

const FoodRecipe = ({ data }) => {

  const categoryUrl = data && data[0].node.categories.edges[0].node.slug;

  const ButtonPost = React.forwardRef(({ onClick, href, data }, ref ) => {
    return (
      <div href={href} onClick={onClick} ref={ref}>
        <p className={styles.PostLink}>{data.title}</p>
      </div>
    );
  });

  const ButtonLink = ({ dataItem }) => {
    return (
    <Link href={`/foods/${categoryUrl}/${dataItem.slug}`} passHref>
      <ButtonPost data={dataItem} />
    </Link>
  )};

  return (
    <div className={styles.FoodRecipe}>
      <h3 className={styles.Heading}>Recent Recipes</h3>
      {data?.map((post) => {
        return (
          <ButtonLink
            key={post.node.id}
            dataItem={post.node}
          />
        );
      })}
    </div>
  );
};

export default FoodRecipe;
