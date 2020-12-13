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
    # productCategories {
    #   edges {
    #     node {
    #       image {
    #         title(format: RENDERED)
    #         uri
    #         sourceUrl(size: LARGE)
    #       }
    #       name
    #       slug
    #       uri
    #       id
    #       databaseId
    #     }
    #   }
    # }
  }
`

