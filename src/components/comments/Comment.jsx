const Comment = ({ data }) => {
  // console.log(" comment data: ", data);

  const { profile, metadata, createdAt, id } = data;

  const userProPic = profile?.picture?.medium?.url?.length
    ? profile.picture.medium.url
    : "https://storageapi.fleek.co/c43ca3a0-c092-4d21-8877-4dc28180feca-bucket/undraw_profile_pic_ic-5-t.svg";
  const userProName = profile.name?.length ? profile.name : profile.id;
  const userProDesc = profile.bio?.length ? profile.bio : "";

  return (
    <li className="py-4 border-b-2 border-gray-100">
      <div className="flex space-x-3">
        <img className="h-6 w-6 rounded-full" src={userProPic} alt="" />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">{userProName}</h3>
            <p className="text-sm text-gray-500">
              {createdAt.slice(5, 10) + " " + createdAt.slice(12, 16)}
            </p>
          </div>
          <p className="">{metadata.content}</p>

          {!metadata.image?.url?.length ? (
            <></>
          ) : (
            <img src="metadata.image.url" alt="" />
          )}
        </div>
      </div>
    </li>
  );
};

export default Comment;
