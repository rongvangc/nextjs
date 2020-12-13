import React from "react";
import { useStore } from "../../../pages/_app";
import styles from "./SideBarMenu.module.css";
import Link from "next/link";
import { useRouter } from 'next/router';

const SideBarMenu = () => {
  const [store] = useStore();
  const { categories } = store;

  const router = useRouter();

  const CatTag = ({ image, name, slug }) => {

    let classContainer = styles.CatItemContainer;
    if(router.query.id === slug) {
      classContainer = [styles.CatItemContainer, styles.Active].join(' ');
    }

    return (
      <Link href={`/menu/${slug}`} className={styles.CatItem}>
        <div className={classContainer}>
          <div className={styles.ImageBox}>
            <img src={image} alt="" />
          </div>
          <p>{name}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className={styles.MenuItems}>
      {categories?.map((cat) => (
        <CatTag
          key={cat.node.id}
          name={cat.node.name}
          image={cat.node.image?.sourceUrl}
          slug={cat.node.slug}
        />
      ))}
    </div>
  );
};

export default SideBarMenu;
