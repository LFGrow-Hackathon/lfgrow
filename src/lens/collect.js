import { gql } from "@apollo/client/core";
import { apolloClient } from "helpers/apollo-client";
import { login } from "lens/login-users";
import {
  getAddressFromSigner,
  signedTypeData,
  splitSignature,
} from "helpers/ethers.service";
import { lensHub } from "lens/utils/lens-hub";

const CREATE_COLLECT_TYPED_DATA = `
  mutation($request: CreateCollectRequest!) { 
    createCollectTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CollectWithSig {
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
        pubId
        data
      }
     }
   }
 }
`;

// TODO typings
const createCollectTypedData = (createCollectTypedDataRequest) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_COLLECT_TYPED_DATA),
    variables: {
      request: createCollectTypedDataRequest,
    },
  });
};

export const collect = async (_pubId) => {
  const address = getAddressFromSigner();
  console.log("collect: address", address);

  await login(address);

  // must follow to collect need to wait for it to be indexed!
  // await follow('0x032f1a');

  // hard coded to make the code example clear
  // remember you must make sure you approved allowance of
  // this currency on the module
  const collectRequest = {
    publicationId: _pub,
  };

  const result = await createCollectTypedData(collectRequest);
  console.log("collect: createCollectTypedData", result);

  const typedData = result.data.createCollectTypedData.typedData;
  prettyJSON("collect: typedData", typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  console.log("collect: signature", signature);

  const { v, r, s } = splitSignature(signature);

  const tx = await lensHub.collectWithSig(
    {
      collector: address,
      profileId: typedData.value.profileId,
      pubId: typedData.value.pubId,
      data: typedData.value.data,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    },
    { gasLimit: 1000000 }
  );
  console.log("collect: tx hash", tx.hash);
};