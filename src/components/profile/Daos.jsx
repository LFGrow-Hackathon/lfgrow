import { UserIcon, BookmarkIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

export default function Daos({ DAO }) {

  const navigate = useNavigate();

  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };


  // if (DAO) {
  //   for (let dao in DAO) {
  //     DAO[dao]
  //   }
  // }

  return (
    <div className="grid grid-cols-1 mt-5 gap-4 sm:grid-cols-3">
      {DAO && DAO.map((DAO, index) => (
        <div
          key={index}
          className="relative rounded-lg border border-gray-300 bg-white px-2 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={resolveLink(DAO.space.avatar)}
              alt=""
            />
          </div>
          <div className="flex-1 min-w-0">
            <button onClick={() => {
              navigate(`/communities/${DAO?.space.id.slice(0, -4)}`);
            }} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{DAO.space.name}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                4 votes
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
