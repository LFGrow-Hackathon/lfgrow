
import { gql } from '@apollo/client/core';
import { apolloClient } from '@/helpers/apollo-client';
import { login } from '@/lens/login-users';
import {
  signedTypeData,
  splitSignature,
} from '@/helpers/ethers-service';
import { lensHub } from '@/lens/utils/lens-hub';

const CREATE_SET_PROFILE_IMAGE_URI_TYPED_DATA = `
  mutation($request: UpdateProfileImageRequest!) { 
    createSetProfileImageURITypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          SetProfileImageURIWithSig {
            name
            type
          }
        }
        value {
          nonce
        	deadline
        	imageURI
        	profileId
        }
      }
    }
 }
`;

const createSetProfileImageUriTypedData = (request) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_SET_PROFILE_IMAGE_URI_TYPED_DATA),
    variables: {
      request,
    },
  });
};

export const setProfileImageUriNormal = async ({ profileId, url }) => {
  if (!profileId) {
    throw new Error('Must define PROFILE_ID');
  }

  await login();

  const setProfileImageUriRequest = {
    profileId,
    url,
  };

  const result = await createSetProfileImageUriTypedData(
    setProfileImageUriRequest
  );

  const typedData = result.data.createSetProfileImageURITypedData.typedData;

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );

  const { v, r, s } = splitSignature(signature);

  const tx = await lensHub.setProfileImageURIWithSig({
    profileId: typedData.value.profileId,
    imageURI: typedData.value.imageURI,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
};

export default createSetProfileImageUriTypedData;