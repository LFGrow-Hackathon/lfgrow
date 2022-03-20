import { apolloClient } from '@/apollo-client';
import { gql } from '@apollo/client';

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`

export const authenticate = (address, signature) => {
   return apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  })
}