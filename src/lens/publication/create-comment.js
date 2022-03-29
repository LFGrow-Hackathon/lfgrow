import { gql } from "@apollo/client/core";
import { apolloClient } from "helpers/apollo-client";
import { utils } from "ethers";
import { login } from "lens/login-users";
import { signedTypeData, splitSignature } from "helpers/ethers-service.js";
import { pollUntilIndexed } from "lens/utils/has-transaction-been-indexed";
import { lensHub } from "../utils/lens-hub";

const CREATE_COMMENT_TYPED_DATA = `
  mutation($request: CreatePublicCommentRequest!) { 
    createCommentTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CommentWithSig {
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

// TODO types
const createCommentTypedData = (createCommentTypedDataRequest) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_COMMENT_TYPED_DATA),
    variables: {
      request: createCommentTypedDataRequest,
    },
  });
};

const createComment = async (ipfsCid, _publicationId) => {
  const profileId = localStorage.getItem("profileId");

  if (!ipfsCid && !_publicationId) {
    throw new Error("ipfsCid is undefined");
  } else if (profileId === "undefined") {
    throw new Error("You do not have a Lens profile");
  }

  await login();

  const createCommentRequest = {
    profileId,
    publicationId: _publicationId,
    contentURI: "ipfs://" + ipfsCid,
    collectModule: {
      revertCollectModule: true,
    },
    referenceModule: {
      followerOnlyReferenceModule: false,
    },
  };

  const result = await createCommentTypedData(createCommentRequest);
  console.log("create comment: createCommentTypedData", result);

  const typedData = result.data.createCommentTypedData.typedData;
  console.log("create comment: typedData", typedData);

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
  console.log("create comment: signature", signature);

  const { v, r, s } = splitSignature(signature);

  const tx = await lensHub.commentWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    profileIdPointed: typedData.value.profileIdPointed,
    pubIdPointed: typedData.value.pubIdPointed,
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
  console.log("create comment: tx hash", tx.hash);

  console.log("create comment: poll until indexed");
  const indexedResult = await pollUntilIndexed(tx.hash);

  console.log("create comment: profile has been indexed", result);

  const logs = indexedResult.txReceipt.logs;

  console.log("create comment: logs", logs);

  const topicId = utils.id(
    "CommentCreated(uint256,uint256,string,uint256,uint256,address,bytes,address,bytes,uint256)"
  );
  console.log("topicid we care about", topicId);

  const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);
  console.log("create comment: created log", profileCreatedLog);

  let profileCreatedEventLog = profileCreatedLog.topics;
  console.log("create comment: created event logs", profileCreatedEventLog);

  const publicationId = utils.defaultAbiCoder.decode(["uint256"], profileCreatedEventLog[2])[0];

  return result.data;
};

export default createComment;