import { gql } from "@apollo/client/core";
import { apolloClient } from "../helpers/apollo-client";

const HAS_MIRRORED = `
  query($request: HasMirroredRequest!) {
    hasMirrored(request: $request) {
      profileId
      results {
        mirrored
        publicationId
      }
    }
  }
`;

const hasMirroredRequest = (profilesRequest) => {
  return apolloClient.query({
    query: gql(HAS_MIRRORED),
    variables: {
      request: {
        profilesRequest,
      },
    },
    fetchPolicy: "network-only",
  });
};

export const hasMirrored = async (_profileId, _publicationIds) => {
  const result = await hasMirroredRequest([
    {
      profileId: _profileId,
      publicationIds: _publicationIds,
    },
  ]);
  const mirrored = result.data.hasMirrored[0].results[0].mirrored;
  return mirrored;
};
