import React from "react";
import styles from "./FoodCatBox.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const FoodCatBox = (props) => {
  const { name, slug } = props;
  const route = useRouter();

  const ButtonFood = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <div
        href={href}
        onClick={onClick}
        ref={ref}
        className={styles.FoodCatBox}
      >
        <h4>{name}</h4>
      </div>
    );
  });

  return (
    <Link href={route.asPath + "/" + slug} passHref>
      <ButtonFood />
    </Link>
  );
};

export default FoodCatBox;
