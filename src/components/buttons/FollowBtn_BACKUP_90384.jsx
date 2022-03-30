import { follow } from "lens/follow.js";

export default function FollowBtn({ profileId, setLoading }) {
  const followFunc = async () => {
    await follow(profileId);
  };


  return (
    <button
      onClick={() => {
        followFunc();
        setLoading(true);
      }}
      className="inline-flex items-center max-h-10 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] hover:border-blue-400 hover:border-1"
      style={{
        background:
          "linear-gradient(107.71deg, #12C2E9 0%, #C471ED 44.48%, #F64F59 99.31%",
        padding: "7px 30px",
        boxShadow: "1px 3px 3px rgba(28, 119, 188, 0.15)",
        border: "0",
      }}
    >
      FOLLOW
    </button>
  );
}
