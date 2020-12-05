import { gql } from '@apollo/client';

export const HEADER = gql`
  query Header {
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

    generalSettings {
      url
      title
    }
  }
`

