import { gql } from '@apollo/client';

export const FOOD_CATEGORIES = gql`
  
  query FoodCat {
    categories {
      edges {
        node {
          name
          id
          slug
          categoryId
        }
      }
    }
  }
`
