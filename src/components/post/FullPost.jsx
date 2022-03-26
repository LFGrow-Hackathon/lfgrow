const FullPost = ({ postData }) => {
  // console.log("postData: ", postData);
  const userProPic = postData.profile.picture?.medium?.url.length
    ? postData.profile.picture?.medium?.url
    : "https://storageapi.fleek.co/c43ca3a0-c092-4d21-8877-4dc28180feca-bucket/undraw_profile_pic_ic-5-t.svg";
  const userProName = postData.profile.name?.length
    ? postData.profile.name
    : postData.profile.id;
  const userProDesc = postData.profile.bio;
  return (
    <>
      <div
        className="flex flex-col w-full items-center self-start justify-center"
        id={postData.profile.id}
      >
        <div className="flex self-start space-x-3 space-y-3">
          <div className="my-2 mx-5">
            <img
              className="h-12 w-12 rounded-full"
              src={userProPic}
              alt="Profile Picture"
            />
          </div>
          <div className="flex-1">
            <div className="text-xl font-medium">{userProName}</div>
            <div className="text-gray-500 text-sm">{userProDesc}</div>
          </div>
        </div>
        <div className="m-3">
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
          <div className="text-gray-800 self-start flex space-x-3">
            <p>mirrors: {postData.stats.totalAmountOfMirrors}</p>
            <p>collection: {postData.stats.totalAmountOfCollects}</p>
            <p>comments: {postData.stats.totalAmountOfComments}</p>
          </div>
          <div className="self-end pr-3">
            <p className="text-sm text-gray-500">{postData.createdAt}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullPost;
