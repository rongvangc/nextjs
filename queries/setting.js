import { gql } from '@apollo/client';

export const SETTINGS = gql`
  query Settings {
    generalSettings {
      url
      title
    }
  }
`

