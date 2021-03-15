import React from "react";
import { useStore } from "../../../pages/_app";
import styles from "./SideBarFoodMenu.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const SideBarFoodMenu = () => {
  const [store] = useStore();
  const { foodCategories } = store;

  const router = useRouter();

  const CatTag = ({ name, slug }) => {
    let classContainer = styles.CatItem;

    if (router.query.id === slug) {
      classContainer = [styles.CatItem, styles.Active].join(" ");
    }

    return (
      <Link href={`/foods/${slug}`}>
        <div className={classContainer}>
          <p>{name}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className={styles.MenuItems}>
      {foodCategories?.map((foodCat) => (
        <CatTag
          key={foodCat.node.id}
          name={foodCat.node.name}
          slug={foodCat.node.slug}
        />
      ))}
    </div>
  );
};

export default SideBarFoodMenu;
