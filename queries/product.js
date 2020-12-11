import { gql } from "@apollo/client";

export const PRODUCT = gql`
  query Product($catSlug: ID!) {
    product(id: $catSlug, idType: SLUG) {
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
`;
