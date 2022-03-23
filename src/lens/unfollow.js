import { gql } from '@apollo/client/core';
import { ethers } from 'ethers';
import { apolloClient } from '../apollo-client';
import { LENS_HUB_ABI } from '@/lens/utils/config-abi';
import { getAddress, getSigner, signedTypeData, splitSignature } from '@/ethers-service';

const CREATE_UNFOLLOW_TYPED_DATA = `
  mutation($request: UnfollowRequest!) { 
    createUnfollowTypedData(request: $request) {
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
          BurnWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          tokenId
        }
      }
    }
 }
`;

const createUnfollowTypedData = (profile) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_UNFOLLOW_TYPED_DATA),
    variables: {
      request: {
        profile,
      },
    },
  });
};

const unfollow = async (unfollowProfileId) => {
  if (!unfollowProfileId) {
    throw new Error('unfollowProfileId is undefined');
  }

  const address = await getAddress();
  console.log('unfollow: address', address);

  // hard coded to make the code example clear
  const result = await createUnfollowTypedData(unfollowProfileId);
  console.log('unfollow: result', result);

  const typedData = result.data.createUnfollowTypedData.typedData;

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
  console.log('unfollow: signature', signature);

  const { v, r, s } = splitSignature(signature);

  // load up the follower nft contract
  const followNftContract = new ethers.Contract(
    typedData.domain.verifyingContract,
    LENS_HUB_ABI,
    getSigner()
  );

  const sig = {
    v,
    r,
    s,
    deadline: typedData.value.deadline,
  };

  // force the tx to send
  const tx = await followNftContract.burnWithSig(typedData.value.tokenId, sig);
  console.log('follow: tx hash', tx.hash);
};

export default unfollow;