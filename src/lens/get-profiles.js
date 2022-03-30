import { gql } from "@apollo/client/core";
import { apolloClient } from "../helpers/apollo-client";

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

const getProfilesRequest = (request) => {
  return apolloClient.query({
    query: gql(GET_PROFILES),
    variables: {
      request,
    },
    fetchPolicy: "network-only",
  });
};

/*
** You can request profiles in 3 differents ways: 
**  - with handles. Example of request object:
**       request: { handles: ["josh.dev"], limit: 1 }
**   - with addresses. Example of request object:
**       request: { ownedBy: ["0xD020E01C0c90Ab005A01482d34B808874345FD82"], limit: 10 }
**   - with profileIds. Example of request object:
**       request: { profileIds: ["0x01"], limit: 10 }
**
** Note how everything is plural, so you can pass multiple id/handle/address in the array. Example : ["0x01", "0x02"]
*/
async function getProfiles(request) {
  const profiles = await getProfilesRequest(request);


  return profiles.data;
};

export default getProfiles;