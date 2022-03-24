import { useState, useEffect, useRef } from "react";
import { useMoralis } from "react-moralis";
import ConnectModal from "@/components/Connect/ConnectModal.jsx";
import getProfiles from "@/lens/get-profiles";
import { useNavigate } from "react-router-dom";

function Account() {
  const { authenticate, isAuthenticated, account, logout } = useMoralis();
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [profileInfo, setProfileInfo] = useState("");
  const profileId = window.localStorage.getItem("profileId");
  const isMounted = useRef(false);

  useEffect(async () => {
    isMounted.current = true;
    if (isAuthenticated && profileId !== "undefined") {
      const request = {
        profileIds: [profileId]
      };
      const { profiles } = await getProfiles(request);

      if (isMounted.current) {
        setProfileInfo(profiles.items[0]);
      }
    }
    return () => { isMounted.current = false; };
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

    let navigate = useNavigate();
    if (profileId === "undefined") {
      useEffect(() => {
        navigate("/welcome");
      }, []);
    }
    return (
      <button
        className="text-gray-500 text-xl font-bold rounded-full bg-white py-2 px-5"
      >
        Lens handle:
        {profileInfo?.handle}
      </button>
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
