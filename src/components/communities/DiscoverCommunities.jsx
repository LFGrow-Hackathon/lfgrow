import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Skeleton() {
  return (
    <li className="col-span-1 flex flex-col animate-pulse text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex-1 flex flex-col px-10 py-10">
        <div className="w-32 h-32 bg-gray-100 flex-shrink-0 mx-auto rounded-full" />
        <div className="mt-6 w-20 h-4 bg-gray-100 flex-shrink-0 mx-auto rounded-lg" />
      </div>
    </li>
  );
}

export default function DiscoverCommunities() {
  const [communities, setCommunities] = useState();
  const { Moralis, isInitialized } = useMoralis();

  useEffect(() => {
    async function getCommunity() {
      const Community = Moralis.Object.extend("Community");
      const query = new Moralis.Query(Community);
      query.greaterThan("followersCount", 50);
      query.limit(200);
      query.descending("followersCount");
      const result = await query.find();
      setCommunities(result);
    }
    if (isInitialized) {
      getCommunity();
    }
  }, [Moralis, isInitialized]);

  if (!communities) {
    return (
      <div className="mt-10  mx-5 sm:mr-20 2xl:mr-44">
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </ul>
      </div>
    );
  }

  return (
    <div className="mt-10  mx-5 sm:mr-20 2xl:mr-44">
      <p className="pb-10 text-xl font-bold text-gray-500">
        Discover 2700+ web3 communities
      </p>
      <ul
        role="list"
        className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
      >
        {communities.map((community) => (
          <NavLink
            key={community.attributes.name}
            to={`/communities/${community.attributes.tokenId}`}
          >
            <li className="col-span-1 flex flex-col text-center rounded-2xl shadow-md hover:shadow-xl">
              <div className="flex flex-col justify-between h-52 sm:h-64 bg-white text-white rounded-lg p-4">
                <div className="flex-1 flex flex-col sm:p-5">
                  <img
                    className="w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0 mx-auto rounded-full"
                    src={community.attributes.logo}
                    alt=""
                  />
                  <h3 className="mt-3 sm:mt-6 text-gray-900 text-sm font-medium">
                    {community.attributes.name}
                  </h3>
                  <dl className="mt-1 flex-grow flex flex-col  justify-between">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-gray-500 text-sm line-clamp-3">
                      {community.attributes.description}
                    </dd>
                  </dl>
                </div>
              </div>
            </li>
          </NavLink>
        ))}
        ;
      </ul>
    </div>
  );
}
