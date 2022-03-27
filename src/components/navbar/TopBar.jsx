import { Fragment, useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Outlet, NavLink } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  LightningBoltIcon,
  UserIcon,
  UserGroupIcon,
  BellIcon,
  HomeIcon,
  MenuAlt2Icon,
  XIcon,
} from "@heroicons/react/outline";
import Account from "./connect/Account";
import Search from "./search/Search";
import getProfiles from "@/lens/get-profiles";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "@/lens/notifications.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TopBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, account } = useMoralis();
  const [handle, setHandle] = useState();
  const [userImage, setUserImage] = useState();
  const profileId = window.localStorage.getItem("profileId");
  const navigate = useNavigate();

  useEffect(async () => {
    if (isAuthenticated) {
      if (profileId && profileId !== "undefined") {
        const { profiles } = await getProfiles({ profileIds: [profileId] });

        setHandle(profiles.items[0]?.handle);
        if (profiles.items[0].picture) {
          setUserImage(profiles.items[0].picture.original?.url);
        }
      } else {
        navigate("/welcome");
      }
    }
  }, [isAuthenticated, profileId]);

  return (
    <div>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-min w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center justify-center px-4">
                  <NavLink
                    to="/"
                    className="text-2xl font-bold bg-gradient-to-r text-transparent bg-clip-text from-[#609EEB] via-purple-500 to-[#E05E99]"
                  >
                    Zilly
                  </NavLink>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <div className="flex w-1/5 flex-col pt-10 pr-5">
                    <button
                      onClick={() => {
                        if (isAuthenticated && handle) {
                          navigate(`/profile/${handle}`);
                        } else {
                          alert(
                            "You need to be connected to access you profile page"
                          );
                        }
                      }}
                      className="inline-flex items-center w-36 mr-3 ml-10 px-5 py-2  text-base font-medium rounded-xl text-black bg-white hover:bg-gray-100"
                    >
                      <UserIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                      <p className="bg-gradient-to-r text-transparent bg-clip-text from-[#609EEB] via-purple-500 to-[#E05E99]">
                        My profile
                      </p>
                    </button>
                    <NavLink
                      to="/"
                      className="inline-flex items-center w-fit mr-3 ml-10 px-5 py-2 text-base font-medium rounded-lg text-black bg-[#fcfcfc] hover:bg-gray-100"
                    >
                      <LightningBoltIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />{" "}
                      Feed
                    </NavLink>
                    <NavLink
                      to="/home"
                      className="inline-flex items-center w-fit mr-3 ml-10 px-5 py-2 text-base font-medium rounded-lg text-black bg-[#fcfcfc] hover:bg-gray-100"
                    >
                      <HomeIcon className="mr-2 h-5 w-5" aria-hidden="true" />{" "}
                      Home
                    </NavLink>
                    <NavLink
                      to="/communities"
                      className="inline-flex items-center w-fit mr-3 ml-10 px-5 py-2 text-base font-medium rounded-lg text-black bg-[#fcfcfc] hover:bg-gray-100"
                    >
                      <UserGroupIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Communities
                    </NavLink>
                  </div>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-[#fcfcfc] overflow-y-auto">
            <div className="flex items-center py-3 flex-shrink-0 bg-gradient-to-r from-[#13C2E9] to-[#609EEB] px-4">
              <NavLink to="/" className="text-white font-bold pl-10 text-4xl">
                Zilly
              </NavLink>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <div className="flex w-1/5 flex-col pt-10 gap-1">
                <button
                  onClick={() => {
                    if (isAuthenticated && handle) {
                      navigate(`/profile/${handle}`);
                    } else {
                      alert(
                        "You need to be connected to access you profile page"
                      );
                    }
                  }}
                  className="inline-flex items-center w-36 mr-3 ml-10 px-5 py-2  text-base font-medium rounded-lg text-black bg-white hover:bg-gray-100"
                >
                  <UserIcon
                    className="mr-2 h-5 w-5 text-blue-400"
                    aria-hidden="true"
                  />
                  <p className="bg-gradient-to-r text-transparent bg-clip-text from-[#609EEB] via-purple-500 to-[#E05E99]">
                    My profile
                  </p>
                </button>
                <NavLink
                  to="/"
                  className="inline-flex items-center w-fit mr-3 ml-10 px-5 py-2 text-base font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <LightningBoltIcon
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />{" "}
                  Feed
                </NavLink>
                <NavLink
                  to="/home"
                  className="inline-flex items-center w-fit mr-3 ml-10 px-5 py-2 text-base font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <HomeIcon className="mr-2 h-5 w-5" aria-hidden="true" /> Home
                </NavLink>
                <NavLink
                  to="/communities"
                  className="inline-flex items-center w-fit mr-3 ml-10 px-5 py-2 text-base font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <UserGroupIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  Communities
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white">
            <button
              type="button"
              className="px-4 bg-gradient-to-r from-[#13C2E9] to-[#609EEB] text-white  md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between bg-gradient-to-r from-[#609EEB] via-purple-500 to-[#E05E99]">
              <div className="flex-1 flex items-center">
                <Search />
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  // onClick={async () => {
                  //   const result = await getNotifications("0x018e");
                  //   console.log("NOTIF", result);
                  // }}
                  className="bg-white p-1 mr-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Account handle={handle} userImage={userImage} />
              </div>
            </div>
          </div>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
