import { useEnsAddress, useNativeTransactions } from "react-moralis";
import getProfiles from "@/lens/get-profiles.js";
import doesFollowFunc from "@/lens/does-follow";
import { useEffect, useState, useRef } from "react";
import FollowBtn from "./FollowBtn";
import UnfollowBtn from "./UnfollowBtn";

export default function DisplayProfile(props) {
  const [profile, setProfile] = useState();
  const [doesFollow, setDoesFollow] = useState();
  const isMounted = useRef(false);

  const { name } = useEnsAddress(props.address);
  const { data: Transactions, error } = useNativeTransactions({
    address: props?.address,
  });

  useEffect(() => {
    isMounted.current = true;
    async function getProfile() {
      const { profiles } = await getProfiles({ ownedBy: [props.address] });
      const resultFollow = await doesFollowFunc(profiles.items[0].id);
      if (isMounted.current) {
        setProfile(profiles.items[0]);
        setDoesFollow(resultFollow);
      }
    };

    if (props.address) {
      getProfile();
    }
    return () => { isMounted.current = false; };
  }, [props.address]);

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
          {doesFollow ? <UnfollowBtn profileId={profile?.id} /> : <FollowBtn profileId={profile?.id} />}
        </>
      )}
    </div>
  );
}
