import Twitter from "@/assets/twitter_logo.png";
import { BookmarkIcon, PencilIcon } from "@heroicons/react/outline";
import CreatePublication from "@/components/publications/CreatePublication.jsx";
import Poaps from "@/components/profile/Poaps";
import Daos from "@/components/profile/Daos";
import DisplayNFT from "@/components/profile/DisplayNFT";
import getProfiles from "@/lens/get-profiles.js";
import { useEffect, useState, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import getAllPoap from "@/api_call/getAllPoap";
import getVote from "@/api_call/getVote";
import MyFeed from "./feed/MyFeed";
import defaultUserIcon from "@/assets/defaultUserIcon.svg";
import doesFollowFunc from "@/lens/does-follow";
import FollowBtn from "./buttons/FollowBtn";
import UnfollowBtn from "./buttons/UnfollowBtn";
import {
  useMoralis,
  useMoralisWeb3Api,
  useNativeTransactions,
} from "react-moralis";

export default function ProfilePage() {
  const idURL = useParams();
  const [profile, setProfile] = useState();
  const [address, setAddress] = useState();
  const [pageDoesntExist, setPageDoesntExist] = useState(false);
  const [isPageOwner, setIsPageOwner] = useState(false);
  const [poap, setPoap] = useState();
  const [vote, setVote] = useState();
  const [NFT, setNFT] = useState();
  const [loading, setLoading] = useState(false);
  const hasClickFollow = useRef(false);
  const [doesFollow, setDoesFollow] = useState(false);
  const { isInitialized, isAuthenticated } = useMoralis();
  const profileId = window.localStorage.getItem("profileId");

  const { data: Transactions } = useNativeTransactions({
    address: address,
  });

  const Web3Api = useMoralisWeb3Api();

  const fetchNFTs = async () => {
    const options = {
      chain: "eth",
      address: address,
    };
    const NFTs = await Web3Api.account.getNFTs(options);
    setNFT(NFTs);
  };

  useEffect(() => {
    async function fetchProfileInfo() {
      //Check if it's an address
      if (idURL.handle.startsWith("0x") && idURL.handle.length === 42) {
        setAddress(idURL.handle);
        const { profiles } = await getProfiles({ ownedBy: [idURL.handle] });
        setProfile(profiles.items[0]);
      }
      //Handle must be less than 32 characters
      else if (idURL.handle.length < 32) {
        const { profiles } = await getProfiles({ handles: [idURL.handle] });
        if (profiles.items.length !== 0) {
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
  }, [idURL.handle]);

  useEffect(() => {
    async function fetchData() {
      if (address) {
        const dataPoap = await getAllPoap(address);
        const dataVote = await getVote(address);
        setPoap(dataPoap);
        setVote(dataVote);
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
      Transactions?.result[Transactions.result.length - 1].block_timestamp;
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
    : `${address?.substring(0, 5)}...${address?.substring(38, 42)}`;

  return (
    <div className="flex">
      <div className="w-full mt-10 px-4 sm:px-4 lg:px-4">
        <div className="">
          <div className="w-full flex justify-between">
            <div className="flex px-2 p-2">
              <div className="mr-4 w-20">
                <img
                  className="inline-block h-20 w-20 rounded-full ring-2 ring-blue-100"
                  src={profile?.picture?.original?.url || defaultUserIcon}
                  alt="profile picture"
                />
              </div>
              <div className="">
                {(profile || address) && (
                  <h4 className="text-lg font-bold">{profileName}</h4>
                )}
                <a
                  href={profile?.twitterUrl || "https://twitter.com/yanis_mezn"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className="inline-block h-5 w-5" src={Twitter} alt="" />
                </a>
              </div>
            </div>
            <div className="flex justify-end divide-x-2 h-10 space-x-3">
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
          <div className="flex w-full justify-between">
            <div className="flex justify-start w-3/4 pl-2">
              <p>{profile?.bio}</p>
            </div>
            {isPageOwner ? (
              <ProfileEditButton />
            ) : !profileId ? (
              <></>
            ) : doesFollow ? (
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
          </div>
        </div>
        <div className="w-full h-full pl-5 pr-5 mt-5 bg-white border-2 border-[#e1e8f7] rounded-md place-content-center shadow-md">
          <div className="mt-5 p-3 rounded-3xl border-[#355DA8] border-2 font-bold bg-[#e2effa] min-h-10 opacity-75">
            Communities
          </div>
          <Daos DAO={vote} />
          <div className="mt-5 p-3 rounded-3xl border-[#355DA8] border-2 font-bold bg-[#e2effa] min-h-10 opacity-75">
            Posts
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {profile?.stats.totalPosts}
            </span>
          </div>
          <CreatePublication />

          <MyFeed profileId={profile?.id} />
        </div>
      </div>
      <div className="w-2/5 mr-5">
        <div className="flex max-h-10 mt-[129px] font-medium text-lg items-center">
          Badges <BookmarkIcon className="h-5 w-5 ml-2" aria-hidden="true" />
        </div>
        <Poaps poaps={poap} />
        <DisplayNFT NFT={NFT} />
      </div>
    </div>
  );
}

const ProfileEditButton = () => {
  return (
    <div className="flex justify-end">
      <NavLink
        to="/edit"
        className="inline-flex items-center max-h-10 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PencilIcon className="h-4 w-4 mr-2" aria-hidden="true" /> Edit profile
      </NavLink>
    </div>
  );
};
