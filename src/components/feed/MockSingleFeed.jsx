import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const MockSingleFeed = ({ data }) => {
  const {
    name,
    handle,
    profilePicture,
    bio,
    postContent,
    postMedia
  } = data

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="p-4 mt-5 bg-white rounded-2xl max-w-3xl w-full hover:bg-gray-50 hover:shadow-sm">
          <div className="flex w-full space-x-3 pb-5 pt-2">
            <Link to={`/profile/${handle}`}>
              <img
                className="h-9 w-9 rounded-full ring-2 ring-blue-100 hover:brightness-90"
                src={profilePicture}
                alt="profile picture"
              />
            </Link>
            <div className="space-y-1 flex flex-col overflow-hidden">
              <div className="flex w-full justify-between items-center">
                <div className="flex flex-col">
                  <Link to={`/profile/${handle}`}>
                    <h3 className="text-sm font-bold hover:underline">{name}</h3>
                  </Link>
                  <p className="w-52 pr-5 line-clamp-1 sm:line-clamp-2 sm:w-full text-gray-500 text-sm">{bio}</p>
                </div>
                <div className="col-span-1 animate-pulse rounded-lg shadow">
                  <div className="w-20 h-3 bg-gray-200 flex-shrink-0 mx-auto rounded-lg" />
                </div>
              </div>
              <p className="text-base text-gray-800 line-clamp-4 break-all">
                {postContent?.replace(/(<([^>]+)>)/gi, "")}
              </p>
              <div className="flex mx-auto pt-5 max-h-96 overflow-hidden">
                <img
                  src={postMedia?.length ? postMedia : ""}
                  alt={postMedia?.length ? "publication image" : ""}
                  className="rounded w-96 pr-2 self-center"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex px-2 justify-end">
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <button
                type="button"
                className="relative cursor-not-allowed inline-flex items-center p-2 pl-2 pr-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-slate-100"
              >
                Mirror{" "}
                <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  0
                </span>
              </button>
              <button
                type="button"
                className="-ml-px relative cursor-not-allowed inline-flex items-center p-2 pl-2 pr-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-slate-100"
              >
                Collect
                <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  0
                </span>
              </button>
              <div
                type="button"
                className="-ml-px relative cursor-not-allowed inline-flex items-center p-2 pl-2 pr-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-slate-100"
              >
                Comments
                <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                  0
                </span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MockSingleFeed;
