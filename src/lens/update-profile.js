import { gql } from "@apollo/client/core";
import { apolloClient } from "../helpers/apollo-client";
import { login } from "@/lens/login-users";
import { getAddressFromSigner } from "@/helpers/ethers-service";

const UPDATE_PROFILE = `
  mutation($request: UpdateProfileRequest!) { 
    updateProfile(request: $request) {
      id
  }
 }
`;

// TODO sort types!
const updateProfileRequest = (profileInfo) => {
  return apolloClient.mutate({
    mutation: gql(UPDATE_PROFILE),
    variables: {
      request: profileInfo,
    },
  });
};

const updateProfile = async (profileNewData) => {
  const { profileId, name, picture, bio, twitterUrl, website, location } = profileNewData;
  if (!profileId) {
    throw new Error("Must define PROFILE_ID in the .env to run this");
  }

  const address = getAddressFromSigner();
  console.log("update profile: address", address);

  await login(address);

  await updateProfileRequest({
    profileId,
    name,
    bio,
    location,
    website,
    twitterUrl,
    picture,
  });

  // await updateProfileRequest(profileNewData);

  // await profiles({ profileIds: [profileId] });
};

export default updateProfile;
