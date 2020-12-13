import { gql } from '@apollo/client';

export const MENU = gql`
  query Menu($items: Int, $catSlug: String) {
    products(first: $items, where: {category: $catSlug}) {
    edges {
      node {
        id
        name
        sku
        slug
        image {
          altText
          uri
          sourceUrl(size: SHOP_THUMBNAIL)
        }
        type
        productCategories {
          nodes {
            databaseId
            id
            name
            slug
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
        ... on SimpleProduct {
          id
          name
          price(format: FORMATTED)
        }
        ... on GroupProduct {
          id
          name
          price
        }
      }
    }
  }
`

