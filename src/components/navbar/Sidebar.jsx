import { Outlet, NavLink } from "react-router-dom";
import {
  LightningBoltIcon,
  UserIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

export default function Sidebar() {
  return (
    <div className="flex">
      <div className="flex w-1/5 h-screen sticky top-0 flex-col pt-10">
        <NavLink
          to="/profile"
          className="inline-flex items-center w-fit mr-3 mb-2 ml-10 px-5 py-2 border border-black text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] hover:border-white hover:text-white"
        >
          <UserIcon
            className="mr-2 h-5 w-5 text-extrabold bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59]"
            aria-hidden="true"
          />{" "}
          My profile
        </NavLink>
        <NavLink
          to="/"
          className="inline-flex items-center w-fit mr-3 ml-10 px-5 py-2 text-base font-medium rounded-full text-black"
        >
          <LightningBoltIcon className="mr-2 h-5 w-5" aria-hidden="true" /> Feed
        </NavLink>
        <NavLink
          to="/home"
          className="inline-flex items-center w-fit mr-3 ml-10 px-5 py-2 text-base font-medium rounded-full text-black bg-white"
        >
          <HomeIcon className="mr-2 h-5 w-5" aria-hidden="true" /> Home
        </NavLink>
        <NavLink
          to="/communities"
          className="inline-flex items-center w-fit mr-3 ml-10 px-5 py-2 text-base font-medium rounded-full text-black bg-white"
        >
          <UserGroupIcon className="mr-2 h-5 w-5" aria-hidden="true" />{" "}
          Communities
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
