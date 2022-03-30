import Twitter from "assets/twitter_logo.png";
import { BookmarkIcon, PencilIcon } from "@heroicons/react/outline";
import { ethers } from "ethers";
import CreatePublication from "components/publications/CreatePublication.jsx";
import Poaps from "components/profile/Poaps.jsx";
import Daos from "components/profile/Daos.jsx";
import DisplayNFT from "components/profile/DisplayNFT.jsx";
import getProfiles from "lens/get-profiles.js";
import { useEffect, useState, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import getAllPoap from "api_call/getAllPoap.js";
import getVote from "api_call/getVote.js";
import MyFeed from "../feed/MyFeed.jsx";
import doesFollowFunc from "lens/does-follow.js";
import FollowBtn from "../buttons/FollowBtn.jsx";
import UnfollowBtn from "../buttons/UnfollowBtn.jsx";
import defaultUserIcon from "assets/defaultUserIcon.png";
import {
  useMoralis,
  useMoralisWeb3Api,
  useNativeTransactions,
} from "react-moralis";

export default function ProfilePage() {
  const idURL = useParams();
  const [profile, setProfile] = useState();
  const [address, setAddress] = useState();
  const [ens, setEns] = useState();
  const [pageDoesntExist, setPageDoesntExist] = useState(false);
  const [isPageOwner, setIsPageOwner] = useState(false);
  const [poap, setPoap] = useState();
  const [vote, setVote] = useState();
  const [NFT, setNFT] = useState();
  const [loading, setLoading] = useState(false);
  const [doesFollow, setDoesFollow] = useState(false);
  const { isInitialized, isAuthenticated } = useMoralis();
  const hasClickFollow = useRef(false);
  const profileId = window.localStorage.getItem("profileId");

  const { data: Transactions } = useNativeTransactions({
    address: address,
  });

  const Web3Api = useMoralisWeb3Api();

  const fetchNFTs = async () => {
    const options = {
      chain: "eth",
      address,
    };
    const NFTs = await Web3Api.account.getNFTs(options);
    setNFT(NFTs);
  };

  useEffect(() => {
    async function fetchProfileInfo() {
      const { handle } = idURL;
      //Check if it's an address
      if (handle.startsWith("0x") && handle.length === 42) {
        setAddress(handle);
        const { profiles } = await getProfiles({ ownedBy: [handle] });
        setProfile(profiles.items[0]);
      }
      //Handle must be less than 32 characters
      else if (handle.length < 32) {
        const { profiles } = await getProfiles({ handles: [handle] });
        if (profiles.items.length > 0) {
          console.log("profile recu:", profiles.items[0]);
          setProfile(profiles.items[0]);
          setAddress(profiles.items[0].ownedBy);
        } else {
          setPageDoesntExist(true);
        }
      } else {
        setPageDoesntExist(true);
      }
    }

    fetchProfileInfo();
  }, [idURL]);

  useEffect(() => {
    async function fetchData() {
      if (address) {
        const dataPoap = await getAllPoap(address);
        const dataVote = await getVote(address);
        const ALCHEMY = process.env.REACT_APP_ALCHEMY_APIKEY;
        const provider = new ethers.providers.AlchemyProvider(
          "homestead",
          ALCHEMY
        );
        const ensResolved = await provider.lookupAddress(address);
        setPoap(dataPoap);
        setVote(dataVote);
        setEns(ensResolved);
      }
      if (profile && profileId) {
        const resultFollow = await doesFollowFunc(profile.id);
        setDoesFollow(resultFollow);
      }
    }
    fetchData();
    if (isInitialized) {
      fetchNFTs();
    }
    if (profile?.id === profileId && isAuthenticated) {
      setIsPageOwner(true);
    }
  }, [address, isInitialized, profile, isAuthenticated]);

  useEffect(() => {
    if (loading) {
      setDoesFollow(!doesFollow);
    }
  }, [loading]);

  let monthsDisplay;
  let yearsDisplay;

  const getAccoutAge = () => {
    const firstTx =
      Transactions?.result[Transactions.result.length - 1]?.block_timestamp;
    if (firstTx) {
      const firstTxDate = new Date(
        `${firstTx?.substring(5, 7)}/${firstTx.substring(
          8,
          10
        )}/${firstTx?.substring(0, 4)}`
      );
      const actualDate = new Date();
      const diffInTime = actualDate.getTime() - firstTxDate.getTime();
      const diffInMonths = Math.ceil(diffInTime / (1000 * 3600 * 24 * 30));
      const years = Math.floor(diffInMonths / 12);
      const months = diffInMonths % 12;
      yearsDisplay = years;
      monthsDisplay = months;
    }
  };
  getAccoutAge();

  if (pageDoesntExist) {
    return <p>This profile doesn&apos;t exist</p>;
  }

  const profileName = profile?.name
    ? profile.name
    : profile?.handle
    ? profile.handle
    : ens
    ? ens
    : `${address?.substring(0, 5)}...${address?.substring(38, 42)}`;
  const ProfileButton = () => {
    if (isPageOwner) {
      return (
        <div className="flex justify-end">
          <NavLink
            to="/edit"
            className="inline-flex items-center max-h-10  text-md font-medium rounded-xl text-black hover:bg-gray-50"
          >
            <PencilIcon className="h-4 w-4 mr-2" aria-hidden="true" /> Edit
            profile
          </NavLink>
        </div>
      );
    } else if (profileId) {
      return (
        <>
          {doesFollow ? (
            <UnfollowBtn
              profileId={profile?.id}
              hasClickFollow={hasClickFollow}
            />
          ) : (
            <FollowBtn
              profileId={profile?.id}
              setLoading={setLoading}
              hasClickFollow={hasClickFollow}
            />
          )}
        </>
      );
    }
    return <></>;
  };

  return (
    <div className="flex">
      <div className="w-full mt-10 px-4 sm:px-4 lg:pr-10">
        <div className="">
          <div className="w-full flex flex-col sm:flex-row justify-between">
            <div className="flex px-2 p-2">
              <div className="mr-4 w-16 sm:w-20">
                <img
                  className="inline-block h-16 w-16 sm:h-20 sm:w-20 rounded-full"
                  src={profile?.picture?.original?.url || defaultUserIcon}
                  alt="profile picture"
                />
              </div>
              <div className="">
                {(profile || address) && (
                  <h4 className="text-xl sm:text-2xl font-bold">
                    {profileName}
                  </h4>
                )}
                <a
                  href={profile?.twitterUrl || "https://twitter.com/yanis_mezn"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className="inline-block h-5 w-5" src={Twitter} alt="" />
                </a>
              </div>
              <div className="block sm:hidden pl-10">
                <ProfileButton />
              </div>
            </div>
            <div className="flex mt-8 mx-2 sm:mx-0 sm:mt-0 divide-x-2 h-10 items-center space-x-3">
              <div className="justify-center">
                <div className="flex gap-2">
                  {yearsDisplay ? (
                    <h4 className="text-md font-bold">{yearsDisplay}y</h4>
                  ) : (
                    ""
                  )}
                  {monthsDisplay ? (
                    <h4 className="text-md font-bold">{monthsDisplay}mo</h4>
                  ) : (
                    ""
                  )}
                </div>
                <h4 className="text-xs text-slate-500">IN WEB3</h4>
              </div>
              <div className="block justify-center pl-2">
                <h4 className="text-md font-bold">{poap?.length}</h4>
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
          <div className="flex w-full mt-8 sm:mt-4 justify-between">
            <div className="flex justify-start sm:w-3/4 pl-2">
              <p>{profile?.bio}</p>
            </div>
            <div className="hidden sm:block">
              <ProfileButton />
            </div>
          </div>
        </div>
        <div className="w-full h-full place-content-center">
          <div className="py-3 mt-5 rounded-2xl">
            <div className="w-fit font-bold min-h-10">
              <p className="bg-gradient-to-r text-transparent bg-clip-text text-2xl from-[#609EEB] via-purple-500 to-[#E05E99]">
                Communities
              </p>
            </div>
            <Daos DAO={vote} />
          </div>
          <div className="mt-5 p-3 flex flex-row w-fit font-bold min-h-10">
            <p className="bg-gradient-to-r pr-3 text-transparent bg-clip-text text-2xl from-[#609EEB] via-purple-500 to-[#E05E99]">
              Post
            </p>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {profile?.stats.totalPosts}
            </span>
          </div>
          <CreatePublication />

          <MyFeed profileId={profile?.id} />
          <div className="block sm:hidden mt-5">
            <Poaps poaps={poap} />
            <DisplayNFT NFT={NFT} />
          </div>
        </div>
      </div>
      <div className="hidden sm:block w-2/5 mr-20 xl:mr-32 mt-[140px]">
        <Poaps poaps={poap} />
        <DisplayNFT NFT={NFT} />
      </div>
    </div>
  );
}
