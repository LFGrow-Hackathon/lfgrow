import { useEnsAddress, useNativeTransactions } from "react-moralis";
import getProfiles from "@/lens/get-profiles.js";
import doesFollowFunc from '@/lens/does-follow'
import { useState } from "react";
import FollowBtn from "./FollowBtn";
import UnfollowBtn from "./UnfollowBtn";

export default function DisplayProfile(props) {
  const [profile, setProfile] = useState();
  const [doesFollow, setDoesFollow] = useState();

  const { name } = useEnsAddress(props.address);
  const { data: Transactions, error } = useNativeTransactions({
    address: props?.address,
  });

  const getProfile = async () => {
    let { profiles } = await getProfiles({ ownedBy: props?.address });
    setProfile(profiles.items[0]);
    setDoesFollow(await doesFollowFunc(profile?.id))
    console.log(doesFollow)
  };

  getProfile();

  const NativeTransactions = () => {
    return (
      <div>
        {error && <>{JSON.stringify(error)}</>}
        <p>Number of transactions: {Transactions?.total}</p>
        <p>
          Age of address: {Transactions?.result.slice(-1)[0]?.block_timestamp}
        </p>
      </div>
    );
  };

  return (
    <div className="px-10 py-5 space-y-5">
      {props?.address && (
        <>
          <p>Address: {props?.address}</p>
          <p>ENS: {name}</p>
          <NativeTransactions />
          <p>Name: {profile?.name || "No name available"}</p>
          <p>Description: {profile?.bio || "No description available"}</p>
          <p>Followers: {profile?.stats?.totalFollowers}</p>
          { doesFollow ? <UnfollowBtn profileId={profile?.id} /> :<FollowBtn profileId={profile?.id} />}
        </>
      )}
    </div>
  );
}
