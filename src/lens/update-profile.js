import { gql } from "@apollo/client/core";
import { apolloClient } from "../helpers/apollo-client";
import { login } from "@/lens/login-users";
import { setProfileImageUriNormal } from "./set-profile-image-uri-normal";

const UPDATE_PROFILE = `
  mutation($request: UpdateProfileRequest!) { 
    updateProfile(request: $request) {
      id
  }
 }
`;

const updateProfileRequest = async (profileInfo) => {
  // probably reseting the whole store isn't the way to go
  await apolloClient.resetStore();
  
  return apolloClient.mutate({
    mutation: gql(UPDATE_PROFILE),
    variables: {
      request: profileInfo,
    },
  });
};

const updateProfile = async (profileNewData) => {
  const { profileId, picture } = profileNewData;
  if (!profileId) {
    throw new Error("Must define profileID");
  }
  await login();

  delete profileNewData.picture;
  await updateProfileRequest(profileNewData);

  if (picture) {
    await setProfileImageUriNormal({ profileId, url: picture })
  }
};

export default updateProfile;
