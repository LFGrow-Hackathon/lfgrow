import { getAddress, signText } from "@/ethers-service"; 
import { gql } from "@apollo/client";
import { apolloClient } from "@/apollo-client";
import getProfiles from "@/lens/get-profiles.js"
import { getAuthenticationToken, setAuthenticationToken } from "./utils/state";

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const authenticate = (address, signature) => {
  return apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
};

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

const generateChallenge = (address) => {
  return apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
};

export const login = async () => {
  
  if (getAuthenticationToken()) {
    console.log("login: already logged in");
    return;
  }

  const address = await getAddress();
  console.log("login: address", address);
  
  // we request a challenge from the server
  const challengeResponse = await generateChallenge(address);
  
  // sign the text with the wallet
  const signature = await signText(challengeResponse.data.challenge.text);
  
  const accessTokens = await authenticate(address, signature);
  
  const request = {
    ownedBy: [address]
  }
  
  const { profiles } = await getProfiles(request)
  
  window.localStorage.setItem("profileId", profiles.items[0]?.id);

  setAuthenticationToken(accessTokens.data.authenticate.accessToken);
  // window.localStorage.setItem("accessToken", accessTokens.data.authenticate.accessToken);
  // window.localStorage.setItem("refreshToken", accessTokens.data.authenticate.refreshToken);
  console.log("accesTokens", accessTokens);
};