import React from "react";
import SideBarFoodMenu from "./SideBarFoodMenu/SideBarFoodMenu";
import { FOOD_CATEGORIES } from "../../queries/foodCategories";
import { FOOD_RECIPE } from "../../queries/foodRecipe";
import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { useStore } from "../../pages/_app";

const SideBarFood = () => {
  const [store, updateStore] = useStore();

  const { loading } = useQuery(FOOD_CATEGORIES, {
    onCompleted: (data) => {
      if (!store.foodCategories) {
        updateStore({
          ...store,
          foodCategories: data.categories.edges,
        });
      }
    },
  });

  const { data } = useQuery(FOOD_RECIPE, {
    variables: {
      items: 5,
    },
  });

  return loading ? (
    <CircularProgress className="Spinner" />
  ) : (
    <SideBarFoodMenu />
  );
};

export default SideBarFood;
