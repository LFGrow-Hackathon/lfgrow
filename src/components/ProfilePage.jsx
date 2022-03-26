import Twitter from "@/assets/twitter_logo.png";
import { UserIcon, BookmarkIcon, PencilIcon } from "@heroicons/react/outline";
import CreatePublication from "@/components/publications/CreatePublication.jsx";
import Poaps from "@/components/profile/Poaps";
import Daos from "@/components/profile/Daos";
import Nfts from "@/components/profile/Nfts";
import getProfiles from "@/lens/get-profiles.js";
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import getAllPoap from "@/api_call/getAllPoap";
import getVote from "@/api_call/getVote";
import { useNFTBalances } from "react-moralis";

//@Tomas:
//Once the props.address is connected again, should be be able to get all the poap and start displaying them (rely on already made components as much as you can using tailwind)
//Regarding the number of transactions and age of the address, you can see how it's done in the page /home (DisplayProfile.js)
//To display the NFT you can use the NFTbalances I've added. We want to display them in the Nfts.js but you can see a working example of how to get the nft + the metadata in Nfts_old.js,
//For the snapshot vote, use the query getVote(address).


export default function ProfilePage(props) {

  const [profile, setProfile] = useState();
  const isMounted = useRef(false);
  const [poap, setPoap] = useState();
  const { data: NFTBalances } = useNFTBalances({ address: props.address });

  useEffect(() => {
    isMounted.current = true;

    async function getProfile() {
      const { profiles } = await getProfiles({ ownedBy: [props.address] });
      if (isMounted.current) {
        setProfile(profiles.items[0]);
        console.log(profiles.items[0]);
      }
    }
    async function fetchPoap() {
      if (props.address) {
        const data = await getAllPoap(props.address);

        if (isMounted.current) {
          setPoap(data);
        }
      }
    }

    if (props.address) {
      getProfile();
      fetchPoap();
    }
    return () => {
      isMounted.current = false;
    };
  }, [props.address]);


  return (
    <div className="flex">
      <div className="w-full mt-10 px-4 sm:px-4 lg:px-4">
        <div className="">
          <div className="w-full flex justify-between">
            <div className="flex">
              <div className="mr-4 flex">
                <img
                  className="inline-block h-20 w-20 rounded-full"
                  src={
                    profile?.picture ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                  alt=""
                />
              </div>
              <div className="">
                <h4 className="text-lg font-bold">{profile?.name || "-"}</h4>
                <a
                  href={profile?.twitterUrl || "https://twitter.com/yanis_mezn"}
                  target="_blank" rel="noreferrer"
                >
                  <img className="inline-block h-5 w-5" src={Twitter} alt="" />
                </a>
              </div>
            </div>
            <div className="flex justify-center divide-x-2 h-10 space-x-3">
              <div className="justify-center">
                <h4 className="text-md font-bold">8mo</h4>
                <h4 className="text-xs text-slate-500">IN WEB3</h4>
              </div>
              <div className="block justify-center pl-2">
                <h4 className="text-md font-bold">23</h4>
                <h4 className="text-xs text-slate-500">POAPS RECEIVED</h4>
              </div>
              <div className="justify-center pl-2">
                <h4 className="text-md font-bold">
                  {profile?.stats.totalFollowing}
                </h4>
                <h4 className="text-xs text-slate-500">FOLLOWING</h4>
              </div>
              <div className="justify-center pl-2">
                <h4 className="text-md font-bold">
                  {profile?.stats.totalFollowers}
                </h4>
                <h4 className="text-xs text-slate-500">FOLLOWERS</h4>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <NavLink
              to="/edit"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PencilIcon className="h-4 w-4 mr-2" aria-hidden="true" /> Edit
              profile
            </NavLink>
          </div>
        </div>
        <div className="w-full h-full pl-5 pr-5 mt-5 bg-white border-2 border-[#e1e8f7] rounded-md place-content-center">
          <div className="mt-5 p-3 border rounded-md border-[#355DA8] border-2 font-bold bg-[#e2effa] min-h-10 opacity-75">
            Communities
            <span className="inline-flex items-center mr-1 ml-3 px-2.5 py-0.5 rounded-md border-pink-800 text-sm font-medium bg-purple-100 text-purple-800">
              24 votes
            </span>
            <span className="inline-flex items-center mr-1 ml-1 px-2.5 py-0.5 rounded-md border-pink-800 text-sm font-medium bg-purple-100 text-purple-800">
              11 DAOS
            </span>
          </div>
          <Daos />
          <div className="mt-5 p-3 border rounded-md border-[#355DA8] border-2 font-bold bg-[#e2effa] min-h-10 opacity-75">
            Posts{" "}
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {profile?.stats.totalPosts}
            </span>
          </div>
          <CreatePublication />
        </div>
      </div>
      <div className="w-2/5 mr-5">
        <div className="flex max-h-10 mt-[129px] font-medium text-lg items-center">
          Badges <BookmarkIcon className="h-5 w-5 ml-2" aria-hidden="true" />
        </div>
        <Poaps />
        <Nfts />
      </div>
    </div>
  );
}
