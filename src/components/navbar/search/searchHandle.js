import getProfiles from "lens/get-profiles.js";

async function searchHandle({ query, setMessage, setIsError }) {
  try {
    setMessage(`Retreiving Lens profile of ${query}`)
    const { profiles } = await getProfiles({ handles: [query] });

    if (profiles.items.length === 0) {
      throw new Error("Lens handle doesn't exist.")
    }

    return `/profile/${profiles.items[0].handle}`;
  } catch (error) {
    setIsError(true);
    setMessage("Sorry, this lens handle doesn't exist.")
    console.error(error);
    return null;
  }
}

export default searchHandle;