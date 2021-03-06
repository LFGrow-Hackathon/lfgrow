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
import logoZilly from "../../assets/logoZilly.svg"
import Account from "./connect/Account";
import Search from "./search/Search";

import getProfiles from "lens/get-profiles";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "lens/notifications.js";

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
            className="fixed inset-0 flex z-40 lg:hidden"
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
                  <div className="flex flex-col pt-10 ">
                    <button
                      onClick={() => {
                        if (isAuthenticated && handle) {
                          navigate(`/profile/${handle}`);
                        } else {
                          alert(
                            "You need to be connected to access you profile page"
                          );
                        }
                        setSidebarOpen(false)
                      }}
                      className="inline-flex items-center w-36 mr-3 ml-3 px-5 py-2  text-base font-medium rounded-xl text-black bg-white hover:bg-gray-100"
                    >
                      <UserIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                      <p className="">
                        My profile
                      </p>
                    </button>

                    {profileId ? (
                      <NavLink
                        to="/home"
                        className="inline-flex items-center w-fit mx-3 px-5 py-2 text-base font-medium rounded-lg text-black bg-[#fcfcfc] hover:bg-gray-100"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <HomeIcon className="mr-2 h-5 w-5" aria-hidden="true" />{" "}
                        Home
                      </NavLink>
                    ) : (
                      <></>
                    )}

                    <NavLink
                      to="/"
                      className="inline-flex items-center w-fit mx-3 px-5 py-2 text-base font-medium rounded-lg text-black bg-[#fcfcfc] hover:bg-gray-100"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <LightningBoltIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Explore
                    </NavLink>
                    <NavLink
                      to="/communities"
                      className="inline-flex items-center w-fit mx-3 px-5 py-2 text-base font-medium rounded-lg text-black bg-[#fcfcfc] hover:bg-gray-100"
                      onClick={() => setSidebarOpen(false)}
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
        <div className="hidden lg:flex lg:w-64 2xl:w-96 3xl:w-[500px] md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col  flex-grow bg-gray-100 overflow-y-auto">
            <div className="flex justify-end py-5 pr-20 flex-shrink-0 bg-gradient-to-r from-[#13C2E9] to-[#609EEB]">
              <NavLink to="/" className="text-white font-bold  text-4xl">
                <img src={logoZilly} alt="" className="h-6" />
              </NavLink>
            </div>
            <div className="mt-5 flex-grow items-end pr-10 flex flex-col">
              <div className="flex flex-col pt-10 gap-1">
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
                  className="inline-flex items-center w-36 py-2 text-xl font-medium rounded-lg text-black hover:bg-white focus:bg-white"
                >
                  <UserIcon
                    className="ml-3 mr-2 h-7 w-7"
                    aria-hidden="true"
                  />
                  My profile
                </button>
                {profileId ? (
                  <>
                    <NavLink
                      to="/home"
                      className="inline-flex items-center w-fit px-3 py-2 text-xl font-medium rounded-lg text-black hover:bg-white focus:bg-white"
                    >
                      <HomeIcon className="mr-2 h-7 w-7" aria-hidden="true" />{" "}
                      Home
                    </NavLink>
                  </>
                ) : (
                  <></>
                )}

                <NavLink
                  to="/"
                  className="inline-flex items-center w-fit px-3 py-2 text-xl font-medium rounded-lg text-black hover:bg-white focus:bg-white"
                >
                  <LightningBoltIcon
                    className="mr-2 h-7 w-7"
                    aria-hidden="true"
                  />
                  Explore
                </NavLink>
                <NavLink
                  to="/communities"
                  className="inline-flex items-center w-fit px-3 py-2 text-xl font-medium rounded-lg text-black hover:bg-white focus:bg-white"
                >
                  <UserGroupIcon className="mr-2 h-7 w-7" aria-hidden="true" />
                  Communities
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:pl-64 2xl:pl-96 3xl:pl-[500px] flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white">
            <button
              type="button"
              className="px-4 bg-gradient-to-r from-[#13C2E9] to-[#609EEB] text-white  lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-10 w-10" aria-hidden="true" />
            </button>
            <div className="flex-auto px-4 flex bg-gradient-to-r from-[#609EEB] via-purple-500 to-[#E05E99]">
              <div className="flex-auto flex items-center justify-center">
                <Search />
              </div>
              <div className="ml-4 flex items-center md:ml-6 lg:pr-10 xl:pr-44 2xl:pr-56">
                <button
                  type="button"
                  // onClick={async () => {
                  //   const result = await getNotifications("0x018e");
                  //   console.log("NOTIF", result);
                  // }}
                  className="hidden sm:block bg-white p-1 mr-2 rounded-full text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Account handle={handle} userImage={userImage} />
              </div>
            </div>
          </div>

          <main className="flex-1 bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
