const SingleFeed = ({ data }) => {
  const userProPic = data.profile.picture;
  const userProName = data.profile.name;
  const userProDesc = data.profile.description;
  const pubContent = data.postContent;
  const pubTime = data.postTimeStamp;
  const pubImge = data.postMedia[0]?.original.url;

  return (
    <>
      {/* <div className="bg-gray-700 flex justify-center flex-col items-center text-white border border-rose-300 ">
        <div className="flex border border-yellow-500">
          <img
            src={userProPic}
            alt="profile picture"
            className="w-20 m-3 rounded-full inline"
          />
          <div className="m-4">
            <div className="text-3xl">{userProName}</div>
            <div className="text-gray-300"> {userProDesc} </div>
          </div>
        </div>
        <div className="post"> {pubContent} </div>
        <div className="pics">pic</div>
      </div> */}

      <div className="flex w-full justify-center">
        <div className="p-4 my-1 border rounded border-slate-300 max-w-3xl w-full">
          <div className="flex space-x-3">
            <img
              className="h-9 w-9 rounded-full"
              src={userProPic}
              alt="profile picture"
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="">
                  <h3 className="text-sm font-medium">{userProName}</h3>
                  <p className="text-gray-500 text-sm">{userProDesc}</p>
                </div>
                <p className="text-sm text-gray-500">{pubTime}</p>
              </div>
              <p className="text-base text-gray-800">
                {pubContent?.replace(/(<([^>]+)>)/gi, "")}
                {/* {pubContent} */}
              </p>
              <img
                src={pubImge?.length ? pubImge : ""}
                alt={pubImge?.length ? "publication image" : ""}
                className="rounded w-96 pr-2"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleFeed;
