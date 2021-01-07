import { gql } from "@apollo/client";

export const REFRESH_TOKEN = gql`
  mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {
    refreshJwtAuthToken(
      input: $input
    ) {
      authToken
    }
  }
`;
