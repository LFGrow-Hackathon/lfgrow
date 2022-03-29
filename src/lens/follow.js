import { gql } from '@apollo/client/core';
import { apolloClient } from '../helpers/apollo-client';
import { signedTypeData, splitSignature, getAddress } from 'helpers/ethers-service';
import { lensHub } from 'lens/utils/lens-hub';
import { setDispatcher } from 'lens/set-dispatcher';
import { relayTransactions } from 'api_call/relayTransactions';

const CREATE_FOLLOW_TYPED_DATA = `
  mutation($request: FollowRequest!) { 
    createFollowTypedData(request: $request) {
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
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
 }
`;

// TODO sort typed!
const createFollowTypedData = (followRequestInfo) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_FOLLOW_TYPED_DATA),
    variables: {
      request: {
        follow: followRequestInfo,
      },
    },
  });
};

export const follow = async (profileId) => {
  if (!profileId) {
    throw new Error("profileId is undefined");
  }

  await setDispatcher();

  const followRequest = [
    {
      profile: profileId,
    },
  ];

  const result = await createFollowTypedData(followRequest);

  const typedData = result.data.createFollowTypedData.typedData;

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);

  const { v, r, s } = splitSignature(signature);

  const request = {
    follower: await getAddress(),
    profileIds: typedData.value.profileIds,
    datas: typedData.value.datas,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  }

  try {
    const res = await relayTransactions({
      method: "post",
      url: "/api/follow",
      data: request,
    });
  } catch (error) {
    const tx = await lensHub.followWithSig(request);
    console.log('follow: tx hash', tx.hash);
    return tx.hash;
  }
};
