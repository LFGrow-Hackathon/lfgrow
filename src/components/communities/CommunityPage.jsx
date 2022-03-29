import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMoralis } from "react-moralis";
import CreatePublication from "../publications/CreatePublication";
import Twitter from "assets/twitter_logo.png";
import Github from "assets/github_logo.png";
import Website from "assets/website_logo.png";
import Feed from "components/feed/Feed.jsx";

export default function CommunityPage() {
  const [community, setCommunity] = useState();
  const [communityDoesntExist, setCommunityDoesntExist] = useState(false);

  let { id } = useParams();
  const { Moralis, isInitialized } = useMoralis();

  useEffect(() => {
    async function getInfoDB() {
      const Community = Moralis.Object.extend("Community");
      const query = new Moralis.Query(Community);
      query.equalTo("tokenId", id);
      const result = await query.find();

      if (result.length !== 0) {
        setCommunity(result[0].attributes);
      } else {
        const query2 = new Moralis.Query(Community);
        query2.equalTo("space_id", `${id}.eth`);
        const result2 = await query2.find();
        if (result2.length !== 0) {
          setCommunity(result2[0].attributes);
        } else {
          setCommunityDoesntExist(true);
        }
      }
    }
    if (isInitialized) {
      getInfoDB();
    }
  }, [isInitialized]);

  if (communityDoesntExist) {
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <div className="w-4/5 border-2 border-red-400 rounded-md p-6 text-center mr-10 mb-10 bg-red-300 text-xl text-white font-black">
          Community not found!
        </div>
      </div>
    );
  }

  if (community) {
    return (
      <div className="flex">
        <div className="w-full mt-10 px-4 sm:px-4 lg:px-4">
          <div className="header flex justify-between">
            <div className="left flex">
              <div className="mr-4 ">
                <img
                  className="inline-block h-20 w-20 rounded-full"
                  src={community?.logo}
                  alt=""
                />
              </div>
              <div className="info flex flex-col justify-end">
                <h4 className="text-lg font-bold">{community?.name || "-"}</h4>
                <div className="links">
                  {community?.twitter_name ? (
                    <a
                      href={`https://twitter.com/${community?.twitter_name}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        className="inline-block h-5 w-5 mr-3"
                        src={Twitter}
                        alt="twitter"
                      />
                    </a>
                  ) : (
                    ""
                  )}
                  {community?.github ? (
                    <a
                      href={community?.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        className="inline-block h-5 w-5 mr-3"
                        src={Github}
                        alt="github"
                      />
                    </a>
                  ) : (
                    ""
                  )}
                  {community?.homepage ? (
                    <a
                      href={community?.homepage}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        className="inline-block h-5 w-5"
                        src={Website}
                        alt="website"
                      />
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <p className="flex mr-5 w-1/2 text-ellipsis max-h-[50px] overflow-hidden mt-[15px]">
              {community.description}
            </p>
          </div>
          <div className="w-full h-full pl-5 pr-5 mt-10 bg-white border-2 border-[#e1e8f7] rounded-md place-content-center shadow-md">
            <div className="mt-5 p-3 rounded-md border-[#355DA8] border-2 font-bold bg-[#e2effa] min-h-10 opacity-75">
              Communities
            </div>
            <CreatePublication />
          </div>
        </div>
        <div className="w-2/5 mr-5">
          <div className="flex max-h-10 mt-[112px] font-lg text-xl items-center">
            Categories
          </div>
          <div className="mt-5">
            {community?.categories.map((category, index) => {
              return (
                <div key={index} className="mt-2 p-2 bg-white border-2 border-blue-200 rounded-md text-md text-slate-900 shadow-sm">
                  {category}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <div className="w-4/5 ounded-md p-6 text-center mr-10 mb-10 text-xl text-white font-black">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black m-auto" />
          <p className="flex justify-center mt-5 text-lg text-black">
            Loading...
          </p>
        </div>
      </div>
    );
  }
}