import { gql } from '@apollo/client';

export const MENU = gql`
  query Menu($items: Int, $catSlug: String) {
    products(first: $items, where: { category: $catSlug }) {
      edges {
        node {
          id
          name
          sku
          slug
          featured
          date
          image {
            sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
            altText
          }
          productCategories {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
          ... on VariableProduct {
            id
            name
            price(format: FORMATTED)
          }
          ... on ExternalProduct {
            id
            name
            price(format: FORMATTED)
          }
          ... on GroupProduct {
            id
            name
            price
          }
          ... on SimpleProduct {
            id
            name
            price(format: FORMATTED)
          }
        }
      }
    }
  }
`

