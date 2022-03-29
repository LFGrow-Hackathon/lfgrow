import unfollow from "lens/unfollow.js";

export default function UnfollowBtn({ profileId, setLoading }) {

  const unfollowFunc = async () => {
    await unfollow(profileId);
  };


  return (
    <button
      onClick={() => {
        unfollowFunc();
        setLoading(true);
      }}
      className="inline-flex items-center max-h-10 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] hover:border-blue-400 hover:border-1"
    >UNFOLLOW</button>
  );
}