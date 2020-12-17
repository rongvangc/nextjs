import { gql } from '@apollo/client';

export const CATEGORIES = gql`
  query Categories {
    productCategories {
      edges {
        node {
          databaseId
          id
          name
          slug
          uri
          image {
            sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
          }
        }
      }
    }
  }
`

