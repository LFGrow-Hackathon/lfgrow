const Comment = ({ data }) => {
  // console.log(" comment data: ", data);

  const { profile, metadata, createdAt, id } = data;

  const userProPic = profile?.picture?.medium?.url?.length
    ? profile.picture.medium.url
    : "https://storageapi.fleek.co/c43ca3a0-c092-4d21-8877-4dc28180feca-bucket/undraw_profile_pic_ic-5-t.svg";
  const userProName = profile.name?.length ? profile.name : profile.id;
  const userProDesc = profile.bio?.length ? profile.bio : "";

  return (
    <div className="flex m-2 p-2 border rounded" id={id}>
      <ul className="divide-y divide-gray-200 w-full" role="list">
        <li className="py-4 self-start justify-start">
          <div className="flex space-x-3">
            <img className="h-6 w-6 rounded-full" src={userProPic} alt="" />
            <div className="flex-1 flex flex-col space-y-1">
              <div className="flex flex-col items-start justify-between">
                <h3 className="text-lg font-medium">{userProName}</h3>
                <p className="text-sm text-gray-500">{userProDesc}</p>
              </div>

              <p className="">{metadata.content}</p>
              {!metadata.image?.url?.length ? (
                <></>
              ) : (
                <img src="metadata.image.url" alt="" />
              )}
              <div className="self-end items-end ">
                <p className="text-sm text-gray-500">{createdAt}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Comment;
