import { useState } from "react";
import { useMoralis } from "react-moralis";
import ConnectModal from "@/components/Connect/ConnectModal.jsx";
import { useEffect } from "react";
import getProfiles from "@/lens/get-profiles";
import { login } from "@/lens/login-users";

function Account() {
  const { authenticate, isAuthenticated, account, logout } = useMoralis();
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [profileInfo, setProfileInfo] = useState("");
  const profileId = window.localStorage.getItem("profileId");

  useEffect(async () => {
    if (isAuthenticated && profileId !== "undefined") {
      const request = {
        profileIds: [profileId]
      };

      const { profiles } = await getProfiles(request);
      setProfileInfo(profiles.items[0]);
    }
  }, [isAuthenticated, profileId]);

  if (!isAuthenticated || !account) {
    return (
      <>
        <button
          className="text-gray-500 text-xl font-bold rounded-full bg-white py-2 px-5"
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

  function LensProfile() {
    return (
      <>
        <button
          className="text-gray-500 text-xl font-bold rounded-full bg-white py-2 px-5"
          onClick={login}>
          Connect to Lens
        </button>
        <p>Lens handle: {profileInfo?.handle}</p>
      </>
    );
  }

  return (
    <>
      <button
        className="text-gray-500 text-xl font-bold rounded-full bg-white py-2 px-5"
        onClick={async () => {
          await logout();
          window.localStorage.removeItem("connectorId");
        }}
      >
        Logout
      </button>
      <LensProfile />
    </>
  );
}

export default Account;
