import { useState, useEffect } from "react";
import { createMirror } from "@/lens/mirror.js";
import { hasMirrored } from "@/lens/check-mirror.js";
import PostStatus from "./PostStatus";
import { NavLink } from "react-router-dom";

const FullPost = ({ postData, mirrored, mirrorFunc, mirrorsCount }) => {
  // console.log("postData: ", postData);
  const userProPic = postData.profile.picture?.medium?.url.length
    ? postData.profile.picture?.medium?.url
    : "https://storageapi.fleek.co/c43ca3a0-c092-4d21-8877-4dc28180feca-bucket/undraw_profile_pic_ic-5-t.svg";
  const userProName = postData.profile.name?.length
    ? postData.profile.name
    : postData.profile.id;
  const userProDesc = postData.profile.bio;
  const handle = postData.profile.handle;

  const ActiveProfileId = window.localStorage.getItem("profileId");
  // const [loading, setLoading] = useState(false);

  // const mirrorFunc = async (_postId) => {
  //   setLoading(true);
  //   await createMirror(ActiveProfileId, _postId);
  //   setLoading(false);
  // };

  // const checkMirror = async (_profileId, _postId) => {
  //   const res = await hasMirrored(_profileId, [_postId]);
  //   setMirrored(res);
  // };

  useEffect(() => {
    if (ActiveProfileId) {
      console.log("check mirror commented");
      // checkMirror(ActiveProfileId, postData.id);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col w-full self-start">
        <div className="flex justify-between">
          <div className="flex self-start space-x-1 space-y-3">
            <div className="my-2 mx-2">
              <NavLink to={"/profile/" + handle}>
                <img
                  className="h-12 w-12 rounded-full"
                  src={userProPic}
                  alt="Profile Picture"
                />
              </NavLink>
            </div>
            <div className="flex-1">
              <div className="text-xl font-bold text-gray-800">
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
        <PostStatus
          postData={postData.stats}
          id={postData.id}
          fnc={{ mirrored, mirrorFunc }}
          from="fullpost"
        />
      </div>
    </>
  );
};

export default FullPost;
