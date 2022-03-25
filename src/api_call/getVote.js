import axios from "axios";

/* ------------------------------- 
  Query all vote for a given address - Snapshot API
  ---------------------------------*/
export default async function getVote(address) {
  const query = `
      query Votes {
        votes (
          first: 1000
          skip: 0
          where: {
            voter: "${address}"
          }
          orderBy: "created",
          orderDirection: desc
        ) {
          id
          voter
          created
          proposal {
            id
            title
            choices
            author start end
          }
          choice
          space {
            id
            name
            symbol
            avatar
            website
            twitter
            github
          }
        }
      }
    `;
  try {
    const response = await axios.post("https://hub.snapshot.org/graphql", { query });
    return response.data.data.votes;
  } catch (error) {
    console.error(error);
    return error;
  }
}