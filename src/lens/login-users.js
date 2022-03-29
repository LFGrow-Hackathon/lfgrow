import { getAddress, signText } from "helpers/ethers-service";
import { gql } from "@apollo/client";
import { apolloClient } from "helpers/apollo-client";
import getProfiles from "lens/get-profiles.js";
import * as jose from "jose";

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

const REFRESH_AUTHENTICATION = `
  mutation($request: RefreshRequest!) { 
    refresh(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const refreshAuth = (refreshToken) => {
  return apolloClient.mutate({
    mutation: gql(REFRESH_AUTHENTICATION),
    variables: {
      request: {
        refreshToken,
      },
    },
  });
};

const refresh = async () => {
  const refreshToken = window.localStorage.getItem("refreshToken");
  const accessToken = window.localStorage.getItem("accessToken");

  if (accessToken === null || accessToken === "undefined") {
    return false;
  }

  let decodedRefresh = jose.decodeJwt(refreshToken);
  let decodedAccess = jose.decodeJwt(accessToken);

  //Check if the accessToken is expired or not
  if (decodedAccess.exp > Date.now() / 1000) {
    return true;
  }

  //Check if the RefreshToken is valid, if yes we refresh them.
  if (decodedRefresh.exp > Date.now() / 1000) {
    try {
      const newAccessToken = await refreshAuth(
        refreshToken
      );
      window.localStorage.setItem("accessToken", newAccessToken.data.refresh.accessToken);
      window.localStorage.setItem("refreshToken", newAccessToken.data.refresh.refreshToken);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  //If both "if" failed, we return false to request a new challenge in login()
  return false;
};

export const login = async () => {

  const address = await getAddress();

  const isTokenValid = await refresh();

  if (isTokenValid) {
    console.log("login: already logged in");
    return;
  }
  // we request a challenge from the server
  const challengeResponse = await generateChallenge(address);

  // sign the text with the wallet
  const signature = await signText(challengeResponse.data.challenge.text);

  const accessTokens = await authenticate(address, signature);

  const request = {
    ownedBy: [address]
  };

  const { profiles } = await getProfiles(request);

  window.localStorage.setItem("profileId", profiles.items[0]?.id);

  // setAuthenticationToken(accessTokens.data.authenticate.accessToken);
  window.localStorage.setItem("accessToken", accessTokens.data.authenticate.accessToken);
  window.localStorage.setItem("refreshToken", accessTokens.data.authenticate.refreshToken);
  console.log("accesTokens", accessTokens);
};