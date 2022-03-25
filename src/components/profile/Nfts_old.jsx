import { useVerifyMetadata } from "hooks/useVerifyMetadata";

function Skeleton() {
  return (
    <li className="relative animate-pulse">
      <div className="group  w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"></div>
      <div className="bg-gray-100 mt-2 w-full h-3 rounded-2xl" ></div>
    </li>
  );
}

export default function DisplayNFT({ NFTBalances }) {

  const { verifyMetadata } = useVerifyMetadata();

  if (!NFTBalances?.result) {
    return (
      <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-8 xl:gap-x-10">
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-8 xl:gap-x-10">
      {NFTBalances.result.map((nft, index) => {
        //Verify Metadata
        nft = verifyMetadata(nft);
        return (
          <li key={index} className="relative">
            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
              <img
                src={nft?.image}
                alt=""
                className="object-cover pointer-events-none group-hover:opacity-75"
              />
            </div>
            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{nft.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
