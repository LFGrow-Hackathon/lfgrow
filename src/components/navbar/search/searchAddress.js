import { Moralis } from "moralis";
import { ethers } from "ethers";
import getProfiles from "lens/get-profiles.js";

function isSupportedDomain(domain) {
  return [
    ".eth",
    ".crypto",
    ".coin",
    ".wallet",
    ".bitcoin",
    ".x",
    ".888",
    ".nft",
    ".dao",
    ".blockchain",
  ].some((tld) => domain.endsWith(tld));
}

async function searchAddress({ query, setMessage, setIsError }) {
  let address = undefined;

  try {
    if (isSupportedDomain(query)) {
      if (query.endsWith(".eth")) {
        setMessage("Looking in the ENS directory");
        const provider = new ethers.providers.AlchemyProvider("homestead", process.env.VITE_ALCHEMY_APIKEY);

        address = await provider.resolveName(query);
        if (!address) {
          throw new Error("Ens name does not exist");
        }
      } else {
        setMessage("Looking in the Unstoppable domain directory");
        const result = await Moralis.Web3API.resolve.resolveDomain({ domain: query });
        address = result.address;
      }
    } else if (query.length === 42) {
      address = query;
    }

    setMessage(`Checking if ${query} has a Lens profile`);
    const { profiles } = await getProfiles({ ownedBy: [address] });

    if (profiles.items.length > 0) {
      return `/profile/${profiles.items[0].handle}`;
    }

    setMessage(`${query} isn't using Lens. Generating a profile based on his on-chain data`);
    return `/profile/${address}`;
  } catch (error) {
    setIsError(true);
    setMessage("No user found for this address, try with a valid one, please.");
    console.error(error);
    return null;
  }

}

export default searchAddress;