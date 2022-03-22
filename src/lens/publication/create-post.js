import { signedTypeData, splitSignature } from '@/ethers-service.js';
import { lensHub } from '../utils/lens-hub';
import { apolloClient } from '@/apollo-client.js';
import { gql } from '@apollo/client'

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

async function createPost() {
  const createPostRequest = {
    profileId: "0xed",
    contentURI: "ipfs://QmcfbLAciGdNFQJwiHTwoM287wE8hjprMq7pLNUUpQTfSc",
    collectModule: {
      emptyCollectModule: true
    },
    referenceModule: {
      followerOnlyReferenceModule: false
    }
  } 
  
  try {
    const result = await createPostTypedData(createPostRequest);
    console.log('create post: createPostTypedData', result);
    
    const typedData = result.data.createPostTypedData.typedData;
    console.log('create post: typedData', typedData);

    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    console.log('create post: signature', signature);

    const { v, r, s } = splitSignature(signature);

    const tx = await lensHub.postWithSig({
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleData: typedData.value.collectModuleData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleData: typedData.value.referenceModuleData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
    console.log('create post: tx hash', tx.hash);
    return tx;
  } catch(error) {
    console.error(error);
  }
}

export default createPost;
