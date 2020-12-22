import { gql } from "@apollo/client";

export const FOOD_RECIPE = gql`
  query FoodRecipe($items: Int, $catSlug: String) {
    posts(first: $items, where: { categoryName: $catSlug }) {
      edges {
        node {
          id
          isSticky
          modified
          modifiedGmt
          slug
          title(format: RENDERED)
          foodRecipe {
            directions {
              item
            }
            ingredients {
              item
            }
            person
            time
          }
          featuredImage {
            node {
              sourceUrl(size: POST_THUMBNAIL)
            }
          }
        }
      }
    }
  }
`;
