import { NavLink } from "react-router-dom";
import defaultUserIcon from "assets/defaultUserIcon.png";

const Comment = ({ data }) => {
  const { profile, metadata, createdAt, id } = data;

  const userProPic = profile?.picture?.medium?.url?.length
    ? profile.picture.medium.url
    : defaultUserIcon;
  const userProName = profile?.name?.length
    ? profile?.name
    : profile?.handle?.length
      ? profile?.handle
      : profile?.id;
  const handle = profile.handle;
  // const userProDesc = profile.bio?.length ? profile.bio : "";

  return (
    <li className="p-4 bg-white rounded-xl">
      <div className="flex space-x-3">
        <NavLink to={"/profile/" + handle}>
          <img className="h-8 w-8 rounded-full" src={userProPic} alt="" />
        </NavLink>
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
