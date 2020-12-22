import { gql } from "@apollo/client";

export const FOOD = gql`
  query Food($catSlug: ID!) {
    post(id: $catSlug, idType: SLUG) {
      title(format: RENDERED)
      content(format: RENDERED)
      date
      dateGmt
      isSticky
      featuredImage {
        node {
          sourceUrl(size: LARGE)
        }
      }
      categories {
        edges {
          node {
            id
            slug
            name
          }
        }
      }
      author {
        node {
          id
          name
        }
      }
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
      tags {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  }
`;
