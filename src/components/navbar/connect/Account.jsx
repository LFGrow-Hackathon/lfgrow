import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import ConnectModal from "components/navbar/connect/ConnectModal.jsx";
import defaultUserIcon from "assets/defaultUserIcon.png";

const defaultImage = "https://storageapi.fleek.co/c43ca3a0-c092-4d21-8877-4dc28180feca-bucket/undraw_profile_pic_ic-5-t.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Account(props) {
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const { authenticate, isAuthenticated, account, logout } = useMoralis();


  if (!isAuthenticated || !account) {
    return (
      <>
        <button
          className="text-gray-500 text-xs lg:text-lg font-bold rounded-full bg-white py-2 px-3 lg:px-5"
          onClick={() => {
            setIsAuthModalVisible(true);
          }}
        >
          Connect
        </button>
        <ConnectModal
          isAuthModalVisible={isAuthModalVisible}
          setIsAuthModalVisible={setIsAuthModalVisible}
          authenticate={authenticate}
        />
      </>
    );
  }

  return (
    <>
      <Menu as="div">
        <div>
          <Menu.Button className="bg-white rounded-full py-1 px-1 lg:py-1 lg:px-2 flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <p className="hidden lg:block text-lg truncate text-gray-500 font-bold mr-2">{props.handle}</p>
            <img className="h-8 w-8 rounded-full" src={props.userImage ? props.userImage : defaultUserIcon} alt="" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 lg:right-5 xl:right-20 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
            <Menu.Item key={1}>
              {({ active }) => (
                <NavLink
                  to="/welcome"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block py-2 px-4 text-sm text-gray-700"
                  )}
                >
                  Switch profile
                </NavLink>
              )}
            </Menu.Item>
            <Menu.Item key={2}>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block py-2 px-4 text-sm text-gray-700"
                  )}
                  onClick={async () => {
                    await logout();
                    window.localStorage.removeItem("connectorId");
                  }}
                >
                  Logout
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

export default Account;
