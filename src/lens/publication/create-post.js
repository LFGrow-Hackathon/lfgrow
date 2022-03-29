import { signedTypeData, splitSignature } from 'helpers/ethers-service.js';
import { lensHub } from '../utils/lens-hub';
import { apolloClient } from 'helpers/apollo-client.js';
import { gql } from '@apollo/client'
import { setDispatcher } from 'lens/set-dispatcher';
import { relayTransactions } from 'api_call/relayTransactions';
/* import { pollUntilIndexed } from 'lens/utils/has-transaction-been-indexed.js' */

const CREATE_POST_TYPED_DATA = `
  mutation($request: CreatePublicPostRequest!) { 
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleData
        referenceModule
        referenceModuleData
      }
    }
  }
}
`;

function createPostTypedData(createPostTypedDataRequest) {
  return apolloClient.mutate({
    mutation: gql(CREATE_POST_TYPED_DATA),
    variables: {
      request: createPostTypedDataRequest
    },
  });
}

async function createPost({ ipfsCid }) {
  const profileId = localStorage.getItem("profileId");

  if (!ipfsCid) {
    throw new Error("ipfsCid is undefined");
  } else if (profileId === "undefined") {
    throw new Error("You do not have a Lens profile");
  }

  await setDispatcher();

  const createPostRequest = {
    profileId,
    contentURI: "ipfs://" + ipfsCid,
    collectModule: {
      emptyCollectModule: true
    },
    referenceModule: {
      followerOnlyReferenceModule: false
    }
  };

  const result = await createPostTypedData(createPostRequest);
  const { domain, types, value } = result.data.createPostTypedData.typedData;

  const request = {
    profileId: value.profileId,
    contentURI: value.contentURI,
    collectModule: value.collectModule,
    collectModuleData: value.collectModuleData,
    referenceModule: value.referenceModule,
    referenceModuleData: value.referenceModuleData
  }

  try {
    const res = await relayTransactions({
      method: "post",
      url: "/api/create-post",
      data: request,
    });
  } catch (error) {
    console.error("Dispatcher error, going back to normal tx. ", error);
    const signature = await signedTypeData(domain, types, value);

    const { v, r, s } = splitSignature(signature);

    const tx = await lensHub.postWithSig({
      ...request,
      sig: {
        v,
        r,
        s,
        deadline: value.deadline,
      },
    });

    await tx.wait();
    /* const content = await pollUntilIndexed(tx.hash); */
    return tx;
  }
}

export default createPost;
