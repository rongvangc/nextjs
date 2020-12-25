import React from 'react';
import SideBarMenu from './SideBarMenu/SideBarMenu';
import { CATEGORIES } from '../../queries/categories';
import { CircularProgress } from "@material-ui/core";
import { useQuery } from '@apollo/client';
import { useStore } from '../../pages/_app';

const SideBar = () => {
  const [ store, updateStore ] = useStore();
  
  const { loading } = useQuery(CATEGORIES, {
    onCompleted: (data) => {
      if(!store.categories) {
        updateStore({
          ...store,
          categories: data.productCategories.edges
        })
      }
    }
  })

  return (
    loading ? <CircularProgress className="Spinner" /> : <SideBarMenu />
  )
}

export default SideBar;