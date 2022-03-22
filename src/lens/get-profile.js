import { gql } from '@apollo/client/core';
import { apolloClient } from '../apollo-client';
import { login } from "@/lens/login-users"; 
import { getAddressFromSigner } from '@/ethers-service'
import { prettyJSON } from '@/helpers';

const GET_PROFILES = `
  query($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
        name
        bio
        location
        website
        twitterUrl
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        depatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          __typename
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;

// export interface ProfilesRequest {
//   profileIds?: string[];
//   ownedBy?: string;
//   handles?: string[];
//   whoMirroredPublicationId?: string;
// }

const getProfilesRequest = (request) => {
  return apolloClient.query({
    query: gql(GET_PROFILES),
    variables: {
      request,
    },
  });
};

export const profiles = async (request) => {
  const address = getAddressFromSigner();
  console.log('profiles: address', address);

//   await login(address);

  if (!request) {
    request = { ownedBy: address };
  }

  // only showing one example to query but you can see from request
  // above you can query many
  const profilesFromProfileIds = await getProfilesRequest(request);

  // prettyJSON('profiles: result', profilesFromProfileIds.data);

  return profilesFromProfileIds.data;
};

