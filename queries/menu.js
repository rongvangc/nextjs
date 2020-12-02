import { gql } from '@apollo/client';

export const GET_MENU = gql`
  query Menu {
    menuItems(where: {location: PRIMARY}) {
      edges {
        node {
          id
          label
          path
          url
        }
      }
    }
  }
`

