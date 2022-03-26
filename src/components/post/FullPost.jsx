import { useState, useEffect } from "react";
import { createMirror } from "@/lens/mirror.js";
import { hasMirrored } from "@/lens/check-mirror.js";

const FullPost = ({ postData }) => {
  // console.log("postData: ", postData);
  const userProPic = postData.profile.picture?.medium?.url.length
    ? postData.profile.picture?.medium?.url
    : "https://storageapi.fleek.co/c43ca3a0-c092-4d21-8877-4dc28180feca-bucket/undraw_profile_pic_ic-5-t.svg";
  const userProName = postData.profile.name?.length
    ? postData.profile.name
    : postData.profile.id;
  const userProDesc = postData.profile.bio;

  const ActiveProfileId = window.localStorage.getItem("profileId");
  const [mirrored, setMirrored] = useState("");
  const [loading, setLoading] = useState(false);

  const mirrorFunc = async (_postId) => {
    await createMirror(ActiveProfileId, _postId);
  };

  const checkMirror = async (_profileId, _postId) => {
    setLoading(true);
    const res = await hasMirrored(_profileId, [_postId]);
    setMirrored(res);
    setLoading(false);
  };

  useEffect(() => {
    checkMirror(ActiveProfileId, postData.id);
  }, [loading]);

  return (
    <>
      <div className="flex flex-col w-full self-start">
        <div className="flex justify-between">
          <div className="flex self-start space-x-1 space-y-3">
            <div className="my-2 mx-2">
              <img
                className="h-12 w-12 rounded-full"
                src={userProPic}
                alt="Profile Picture"
              />
            </div>
            <div className="flex-1">
              <div className="text-xl font-medium text-gray-800">
                {userProName}
              </div>
              <div className="text-gray-500 text-sm">{userProDesc}</div>
            </div>
          </div>
          <div className="p-3">
            <p className="text-sm text-gray-500">
              {postData.createdAt.slice(5, 10) +
                " " +
                postData.createdAt.slice(12, 16)}
            </p>
          </div>
        </div>
        <div className="m-3 mb-5">
          <div className="post content">{postData.metadata.content}</div>
          {!postData.metadata.image?.length ? (
            <></>
          ) : (
            <div className="post picture flex justify-center">
              <img
                src={postData.metadata.image}
                alt="post image"
                className="rounded w-96 pr-2"
              />
            </div>
          )}
        </div>
        <div className="w-full flex px-2 justify-between">
          <span className="relative z-0 inline-flex shadow-sm rounded-md">
            <div
              type="button"
              className="relative inline-flex items-center p-2 pl-2 pr-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700"
            >
              Mirrors{" "}
              <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {postData.stats.totalAmountOfMirrors}
              </span>
            </div>
            <div
              type="button"
              className="-ml-px relative inline-flex items-center p-2 pl-2 pr-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
            >
              Collected
              <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {postData.stats.totalAmountOfCollects}
              </span>
            </div>
            <div
              type="button"
              className="-ml-px relative inline-flex items-center p-2 pl-2 pr-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700"
            >
              Comments
              <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                {postData.stats.totalAmountOfComments}
              </span>
            </div>
          </span>
          <div className="flex justify-end">
            {mirrored ? (
              <div className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Mirrored
              </div>
            ) : (
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => mirrorFunc(postData.id)}
              >
                Mirror
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FullPost;
