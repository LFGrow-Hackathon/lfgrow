import { gql } from "@apollo/client/core";
import { apolloClient } from "../helpers/apollo-client";
import { login } from "@/lens/login-users";

const UPDATE_PROFILE = `
  mutation($request: UpdateProfileRequest!) { 
    updateProfile(request: $request) {
      id
  }
 }
`;

const updateProfileRequest = (profileInfo) => {
  return apolloClient.mutate({
    mutation: gql(UPDATE_PROFILE),
    variables: {
      request: profileInfo,
    },
  });
};

const updateProfile = async (profileNewData) => {
  const { profileId, name, picture, bio, twitterUrl, website, location, coverPicture } = profileNewData;
  if (!profileId) {
    throw new Error("Must define profileID");
  }

  await login();

  await updateProfileRequest(profileNewData);
};

export default updateProfile;
