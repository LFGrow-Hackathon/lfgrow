import { useVerifyMetadata } from "helpers/useVerifyMetadata.js";
import { resolveIPFS } from "helpers/resolveIPFS.js";

export default function DisplayNFT({ NFT }) {
  const { verifyMetadata } = useVerifyMetadata();

  const formattedResult = NFT?.result.map((nft) => {
    try {
      if (nft.metadata) {
        const metadata = JSON.parse(nft.metadata);
        const image = resolveIPFS(metadata?.image);
        return { ...nft, image, metadata };
      }
    } catch (error) {
      return nft;
    }
    return nft;
  });

  if (NFT?.result.length === 0) {
    return (
      <div className="w-full mt-5 p-2 bg-white border-2 border-[#e1e8f7] rounded-md text-md text-slate-500 shadow-md">
        NFTs
        <p className="py-5 italic">{"This user doesn't have any NFT"}</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-5 p-2 bg-white border-2 border-[#e1e8f7] rounded-md text-md text-slate-500 shadow-md">
      NFTs
      <ul
        role="list"
        className="grid grid-cols-1 mt-5 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {formattedResult &&
          formattedResult.map((nft, index) => {
            nft = verifyMetadata(nft);
            return (
              <li
                key={index}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg"
              >
                <div className="flex-1 flex flex-col">
                  <img
                    className="w-13 h-13 flex-shrink-0 mx-auto rounded-md"
                    src={nft.image}
                    alt=""
                  />
                  <h3 className="mt-1 text-gray-900 text-sm font-medium">
                    {nft.name}
                  </h3>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
