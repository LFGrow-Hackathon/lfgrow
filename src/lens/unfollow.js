import { gql } from "@apollo/client/core";
import { ethers } from "ethers";
import { apolloClient } from "../helpers/apollo-client";
import { LENS_FOLLOW_NFT_ABI } from "lens/utils/config-abi";
import { getAddress, getSigner, signedTypeData, splitSignature } from "helpers/ethers-service";
import { login } from "lens/login-users";
import { setDispatcher } from 'lens/set-dispatcher';
import { relayTransactions } from 'api_call/relayTransactions';


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
    throw new Error("unfollowProfileId is undefined");
  }

  await setDispatcher();

  const result = await createUnfollowTypedData(unfollowProfileId);

  const typedData = result.data.createUnfollowTypedData.typedData;

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);

  const { v, r, s } = splitSignature(signature);

  // load up the follower nft contract
  const followNftContract = new ethers.Contract(
    typedData.domain.verifyingContract,
    LENS_FOLLOW_NFT_ABI,
    getSigner()
  );

  console.log("contract : ", typedData.domain.verifyingContract)

  const sig = {
    v,
    r,
    s,
    deadline: typedData.value.deadline,
  };

  try {
    const res = await relayTransactions({
      method: "post",
      url: "/api/follow",
      data: {
        contractAddress: typedData.domain.verifyingContract,
        tokenId: typedData.value.tokenId,
        sig
      },
    });
  } catch (error) {
    const tx = await followNftContract.burnWithSig(typedData.value.tokenId, sig);
    console.log("follow: tx hash", tx.hash);
  }
};

export default unfollow;