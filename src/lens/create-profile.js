import { gql } from "@apollo/client";
import { BigNumber, utils } from "ethers";
import { apolloClient } from "@/helpers/apollo-client";
import { login } from "@/lens/login-users";
import { getAddressFromSigner } from "@/helpers/ethers-service";
import { pollUntilIndexed } from "./utils/has-transaction-been-indexed";

const CREATE_PROFILE = `
  mutation($request: CreateProfileRequest!) { 
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
			__typename
    }
 }
`;

const createProfileRequest = (createProfileRequest) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: createProfileRequest,
    },
  });
};

const createProfile = async (handleInput) => {
  if (!handleInput) {
    throw new Error('handleInput is undefined');
  }
  const address = getAddressFromSigner();

  await login(address);

  const createProfileResult = await createProfileRequest({
    handle: handleInput,
  });

  if (createProfileResult?.data.createProfile.__typename === "RelayError") {
    alert(`Error when creating a profile: ${createProfileResult?.data.createProfile.reason}`);
    return false;
  }

  console.log("create profile: poll until indexed");
  const result = await pollUntilIndexed(createProfileResult.data.createProfile.txHash);

  console.log("create profile: profile has been indexed", result);

  const logs = result.txReceipt.logs;

  const topicId = utils.id(
    "ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)"
  );

  const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);

  let profileCreatedEventLog = profileCreatedLog.topics;

  const profileId = utils.defaultAbiCoder.decode(["uint256"], profileCreatedEventLog[1])[0];

  window.localStorage.setItem("profileId", BigNumber.from(profileId).toHexString());

  return result;
};

export default createProfile;