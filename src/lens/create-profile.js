import { gql } from "@apollo/client";
// import { BigNumber, utils } from "ethers";
import { apolloClient } from "@/apollo-client";
import { login } from "@/lens/login-users";
import { getAddressFromSigner } from "@/ethers-service";
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
  const address = getAddressFromSigner();
  console.log("create profile: address", address);

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
  // alert("Profile created");

  return result;

  /* ------------------------------- 
  The following part come from LENS' github example, I don't understand why tehy want to look at the tx's logs and topic, if someone knows I'm all ears
  ---------------------------------*/

  // const logs = result.txReceipt.logs;

  // console.log('create profile: logs', logs);

  // const topicId = utils.id(
  //   'ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)'
  // );
  // console.log('topicid we care about', topicId);

  // const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);
  // console.log('profile created log', profileCreatedLog);

  // let profileCreatedEventLog = profileCreatedLog.topics;
  // console.log('profile created event logs', profileCreatedEventLog);

  // const profileId = utils.defaultAbiCoder.decode(['uint256'], profileCreatedEventLog[1])[0];

  // console.log('profile id', BigNumber.from(profileId).toHexString());
};

export default createProfile;