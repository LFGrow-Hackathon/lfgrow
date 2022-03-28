import { signedTypeData, splitSignature } from '@/helpers/ethers-service.js';
import { lensHub } from '../utils/lens-hub';
import { apolloClient } from '@/helpers/apollo-client.js';
import { gql } from '@apollo/client'
import { setDispatcher } from '@/lens/set-dispatcher';
import { relayTransactions } from '@/api_call/relayTransactions';
/* import { pollUntilIndexed } from '@/lens/utils/has-transaction-been-indexed.js' */

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
  })
}

async function createPost({ ipfsCid }) {
  const profileId = localStorage.getItem('profileId');

  if (!ipfsCid) {
    throw new Error('ipfsCid is undefined');
  } else if (profileId === 'undefined') {
    throw new Error("You do not have a Lens profile");
  }


  console.log("Ok this is weird")
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
  }

  try {
    const res = await relayTransactions({
      method: "post",
      url: "/api/create-post",
      data: createPostRequest,
    });

    console.log(res);
  } catch (error) {


    const result = await createPostTypedData(createPostRequest);

    const { domain, types, value } = result.data.createPostTypedData.typedData;

    const signature = await signedTypeData(domain, types, value);

    const { v, r, s } = splitSignature(signature);

    const res = await helloWorld();
    console.log(res);

    const tx = await lensHub.postWithSig({
      profileId: value.profileId,
      contentURI: value.contentURI,
      collectModule: value.collectModule,
      collectModuleData: value.collectModuleData,
      referenceModule: value.referenceModule,
      referenceModuleData: value.referenceModuleData,
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
