import { gql } from "@apollo/client/core";
import { apolloClient } from "../helpers/apollo-client";
import { signedTypeData, splitSignature, getAddress } from "helpers/ethers-service";
import { pollUntilIndexed } from "./utils/has-transaction-been-indexed";
import { lensHub } from "lens/utils/lens-hub";
import { setDispatcher } from 'lens/set-dispatcher';
import { relayTransactions } from 'api_call/relayTransactions';

const CREATE_MIRROR_TYPED_DATA = `
  mutation($request: CreateMirrorRequest!) { 
    createMirrorTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          MirrorWithSig {
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
        profileIdPointed
        pubIdPointed
        referenceModule
        referenceModuleData
      }
     }
   }
 }
`;

// TODO types
const createMirrorTypedData = (createMirrorTypedDataRequest) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_MIRROR_TYPED_DATA),
    variables: {
      request: createMirrorTypedDataRequest,
    },
  });
};

export const createMirror = async (profileId, pubId) => {
  if (!profileId && !pubId) {
    throw new Error("Must define PROFILE_ID and pubId");
  }

  await setDispatcher();

  const createMirrorRequest = {
    profileId,
    // remember it has to be indexed and follow metadata standards to be traceable!
    publicationId: pubId,
    referenceModule: {
      followerOnlyReferenceModule: false,
    },
  };

  const result = await createMirrorTypedData(createMirrorRequest);

  const typedData = result.data.createMirrorTypedData.typedData;
  const request = {
    profileId: typedData.value.profileId,
    profileIdPointed: typedData.value.profileIdPointed,
    pubIdPointed: typedData.value.pubIdPointed,
    referenceModule: typedData.value.referenceModule,
    referenceModuleData: typedData.value.referenceModuleData,
  }

  try {
    const res = await relayTransactions({
      method: "post",
      url: "/api/mirror",
      data: request,
    });
  } catch (error) {
    console.error(error);
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);

    const { v, r, s } = splitSignature(signature);

    const tx = await lensHub.mirrorWithSig({
      ...request,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
    // console.log("create mirror: tx hash", tx.hash);

    // console.log("create mirror: poll until indexed");
    // const indexedResult = await pollUntilIndexed(tx.hash);

    // console.log("create mirror: profile has been indexed", result);

    // const logs = indexedResult.txReceipt.logs;

    // console.log("create mirror: logs", logs);

    // const topicId = utils.id("MirrorCreated(uint256,uint256,uint256,uint256,address,bytes,uint256)");
    // console.log("topicid we care about", topicId);

    // const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);
    // console.log("create mirror: created log", profileCreatedLog);

    // let profileCreatedEventLog = profileCreatedLog.topics;
    // console.log("create mirror: created event logs", profileCreatedEventLog);

    // const publicationId = utils.defaultAbiCoder.decode(["uint256"], profileCreatedEventLog[2])[0];

    // console.log(
    //   "create mirror: contract publication id",
    //   BigNumber.from(publicationId).toHexString()
    // );
    // console.log(
    //   "create mirror: internal publication id",
    //   profileId + "-" + BigNumber.from(publicationId).toHexString()
    // );

  }
};