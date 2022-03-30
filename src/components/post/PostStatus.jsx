import { NavLink } from "react-router-dom";
import FullPost from "./FullPost.jsx";

const PostStatus = ({ postData, id, fnc, from, postId }) => {
  const { mirrored, mirrorFunc } = fnc;

  return (
    <>
      <div className="w-full flex px-2 justify-end">
        <span className="relative z-0 inline-flex shadow-sm rounded-md">
          {mirrored ? (
            <div className="relative inline-flex items-center p-2 pl-2 pr-2 rounded-l-md border border-gray-300 text-sm leading-4 font-medium text-white bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] hover:bg-gray-50 focus:outline-none">
              Mirrored
              <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {postData.totalAmountOfMirrors}
              </span>
            </div>
          ) : (
            <button
              type="button"
              className="relative inline-flex items-center p-2 pl-2 pr-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-slate-100"
              onClick={() => mirrorFunc(id)}
            >
              Mirror{" "}
              <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {postData.totalAmountOfMirrors}
              </span>
            </button>
          )}
          <button
            type="button"
            className="-ml-px relative inline-flex items-center p-2 pl-2 pr-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-slate-100"
          >
            Collect
            <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {postData.totalAmountOfCollects}
            </span>
          </button>
          <div
            type="button"
            className="-ml-px relative inline-flex items-center p-2 pl-2 pr-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-slate-100"
          >
            <NavLink to={"/post/" + postId}>
              Comments
              <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                {postData.totalAmountOfComments}
              </span>
            </NavLink>
          </div>
        </span>
      </div>
    </>
  );
};

export default PostStatus;
