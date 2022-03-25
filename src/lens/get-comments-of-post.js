import { gql } from "@apollo/client/core";
import { apolloClient } from "@/helpers/apollo-client";

const GET_COMMENTS_BY_POST = `
query getCommentsByPost(
  $commentArg: PublicationsQueryRequest!
  $postArg: PublicationQueryRequest!
) {
  comments: publications(request: $commentArg) {
    items {
      ... on Comment {
        id
        metadata {
          content
          description
          image
        }
        createdAt
        profile {
          name
          id
        }
        mainPost {
          ... on Post {
            id
          }
        }
      }
    }
    pageInfo {
      prev
      next
      totalCount
      __typename
    }
  }
  post: publication(request: $postArg) {
    ... on Post {
      id
      metadata {
        content
        image
      }
      createdAt
      stats {
        totalAmountOfMirrors
        totalAmountOfCollects
        totalAmountOfComments
      }
      profile {
        id
        name
        bio
        picture {
          ... on NftImage {
            uri
            contractAddress
          }
          ... on MediaSet {
            medium {
              ...MediaFields
            }
          }
        }
      }
    }
  }
}
fragment MediaFields on Media {
  url
  mimeType
}

`;

const getCommets = (request) => {
  // console.log("request: ", request);
  return apolloClient.query({
    query: gql(GET_COMMENTS_BY_POST),
    variables: request,
  });
};

export const getCommentsByPost = async (request) => {
  if (!request) {
    throw new Error("argument undefined in getCommentsByPost call");
  }
  const comments = await getCommets(request);
  return comments?.data;
};
