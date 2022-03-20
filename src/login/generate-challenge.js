import { apolloClient } from '@/apollo-client';
import { gql } from '@apollo/client'

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`

export const generateChallenge = (address) => {
   return apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
         address,
      },
    },
  })
}