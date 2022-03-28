import { gql } from '@apollo/client/core';
import { lensHub } from './utils/lens-hub';
import { apolloClient } from '@/helpers/apollo-client.js';
import { login } from '@/lens/login-users';
import {
  signedTypeData,
  splitSignature,
} from '@/helpers/ethers-service';
import { relaySetDispatcher } from "@/api_call/relayTransactions"
import { pollUntilIndexed } from '@/lens/utils/has-transaction-been-indexed.js'

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

export const enableDispatcherWithTypedData = (profileId, dispatcher) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_SET_DISPATCHER_TYPED_DATA),
    variables: {
      request: {
        profileId,
        dispatcher,
      },
    },
  });
};

const disableDispatcherWithTypedData = (profileId) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_SET_DISPATCHER_TYPED_DATA),
    variables: {
      request: {
        profileId,
        enabled: false,
      },
    },
  });
};

export const setDispatcher = async () => {
  const profileId = localStorage.getItem('profileId');
  const deadline = window.localStorage.getItem("deadlineDispatcher");

  if (!profileId) {
    throw new Error('Must define PROFILE_ID');
  }

  const currentTime = Math.floor(Date.now() / 1000);
  if (deadline && (deadline > currentTime)) {
    console.log("dispatcher is still valid")
    return true;
  }

  await login();

  const setDispatcherRequest = {
    profileId,
    dispatcher: '0x26daac995338af4762275d6029b45814f5446bd5',
  };

  const result = await enableDispatcherWithTypedData(
    setDispatcherRequest.profileId,
    setDispatcherRequest.dispatcher
  );

  const typedData = result.data.createSetDispatcherTypedData.typedData;

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );

  const { v, r, s } = splitSignature(signature);

  const request = {
    profileId: typedData.value.profileId,
    dispatcher: typedData.value.dispatcher,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  }

  try {
    const res = await relaySetDispatcher(request);

    console.log("res relay set dispathc", res)
    window.localStorage.setItem("deadlineDispatcher", typedData.value.deadline);
  } catch (error) {
    // if dispatcher fail, go back to classic
    const tx = await lensHub.setDispatcherWithSig(request);
    window.localStorage.setItem("deadlineDispatcher", typedData.value.deadline);
  }
};