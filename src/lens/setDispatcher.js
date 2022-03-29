import { signedTypeData, splitSignature } from "helpers/ethers-service";
import { apolloClient } from "helpers/apollo-client";
import { gql } from "@apollo/client";
import { lensHub } from "./utils/lens-hub";
import { login } from "./login-users";

const CREATE_SET_DISPATCHER_TYPED_DATA = `
  mutation($request: SetDispatcherRequest!) { 
    createSetDispatcherTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetDispatcherWithSig {
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
          dispatcher
        }
      }
    }
 }
`;

const enableDispatcherWithTypedData = (profileId, dispatcher) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_SET_DISPATCHER_TYPED_DATA),
    variables: {
      request: {
        profileId,
        dispatcher
      }
    },
  });
};

const disableDispatcherWithTypedData = (profileId) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_SET_DISPATCHER_TYPED_DATA),
    variables: {
      request: {
        profileId,
        enabled: false
      }
    },
  });
};

export const setDispatcher = async () => {
  // hard coded to make the code example clear
  await login();

  const profileId = window.localStorage.getItem("profileId");

  if (!profileId) {
    throw new Error("profileId is undefined");
  }
  console.log("AAA");

  const setDispatcherRequest = {
    profileId: profileId,
    dispatcher: "0x9221C47afA802Ea850Fd65aA18e36A8f6cf56618"
  };

  const result = await enableDispatcherWithTypedData(setDispatcherRequest.profileId, setDispatcherRequest.dispatcher);
  const typedData = result.data.createSetDispatcherTypedData.typedData;
  console.log("result", result);

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
  const { v, r, s } = splitSignature(signature);

  const tx = await lensHub.setDispatcherWithSig({
    profileId: typedData.value.profileId,
    dispatcher: typedData.value.dispatcher,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log(tx.hash);
  // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
  // you can look at how to know when its been indexed here: 
  //   - https://docs.lens.dev/docs/has-transaction-been-indexed
};