import { gql } from "@apollo/client";

export const FOOD_RECIPE = gql`
  query FoodRecipe($items: Int, $catSlug: String, $after: String) {
    posts(first: $items, after: $after,  where: { categoryName: $catSlug }) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
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
          categories {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;
