import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation LoginUser($input: LoginInput!) {
    login( input: $input) {
      authToken
      clientMutationId
      refreshToken
      sessionToken
      user {
        id
        name
        userId
        databaseId
        nickname
        email
        jwtAuthToken
        jwtAuthExpiration 
        jwtRefreshToken
        isJwtAuthSecretRevoked
      }
    }
  }
`;