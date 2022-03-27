import { gql } from '@apollo/client/core';
import { lensHub } from './utils/lens-hub';
import { apolloClient } from '@/helpers/apollo-client.js';
import { login } from '@/lens/login-users';
import {
  signedTypeData,
  splitSignature,
} from '@/helpers/ethers-service';
import { relayTransaction } from "@/api_call/relayTransactions"

const profileId = localStorage.getItem('profileId');

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
  if (!profileId) {
    throw new Error('Must define PROFILE_ID');
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
  console.log('set dispatcher: enableDispatcherWithTypedData', result);

  const typedData = result.data.createSetDispatcherTypedData.typedData;
  console.log('set dispatcher: typedData', typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  console.log('set dispatcher: signature', signature);

  const { v, r, s } = splitSignature(signature);

  const res = await relayTransaction({
    profileId: typedData.value.profileId,
    dispatcher: typedData.value.dispatcher,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log("res ", res)

  // const tx = await lensHub.setDispatcherWithSig({
  //   profileId: typedData.value.profileId,
  //   dispatcher: typedData.value.dispatcher,
  //   sig: {
  //     v,
  //     r,
  //     s,
  //     deadline: typedData.value.deadline,
  //   },
  // });
  // console.log('set dispatcher: tx hash', tx.hash);
};