export default function Nfts(props) {
  return (
    <div className="w-full mt-5 p-2 bg-white border-2 border-[#e1e8f7] rounded-md text-md text-slate-500">
      NFTS
      <ul
        role="list"
        className="grid grid-cols-1 mt-5 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {props.NFTs?.result?.map((nft) => (
          <li
            key={nft.token_address+nft.token_id}
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
        ))}
      </ul>
    </div>
  );
}
