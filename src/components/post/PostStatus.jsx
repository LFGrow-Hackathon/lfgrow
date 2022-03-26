const PostStatus = ({ postData, id, fnc }) => {
  const { mirrored, mirrorFunc } = fnc;
  return (
    <>
      <div className="w-full flex px-2 justify-between ">
        <span className="relative z-0 inline-flex shadow-sm rounded-md">
          <div
            type="button"
            className="relative inline-flex items-center p-2 pl-2 pr-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700"
          >
            Mirrors{" "}
            <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {postData.totalAmountOfMirrors}
            </span>
          </div>
          <div
            type="button"
            className="-ml-px relative inline-flex items-center p-2 pl-2 pr-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
          >
            Collected
            <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {postData.totalAmountOfCollects}
            </span>
          </div>
          <div
            type="button"
            className="-ml-px relative inline-flex items-center p-2 pl-2 pr-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700"
          >
            Comments
            <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
              {postData.totalAmountOfComments}
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
              onClick={() => mirrorFunc(id)}
            >
              Mirror
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PostStatus;
