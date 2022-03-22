import { useState } from "react";
import { useMoralis } from "react-moralis";
import ConnectModal from "@/components/Connect/ConnectModal.jsx";
import { useRef } from "react";

function Account() {
  const { authenticate, isAuthenticated, account, logout } = useMoralis();
  const [ isAuthModalVisible, setIsAuthModalVisible ] = useState(false);
  const isMounted = useRef(false);
  
  if (!isAuthenticated || !account) {
    return (
      <>
        <button
          className="text-gray-500 text-xl font-bold rounded-full bg-white py-2 px-5"
          onClick={() => {
            setIsAuthModalVisible(true);
            isMounted.current = true;
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
      <button
        className="text-gray-500 text-xl font-bold rounded-full bg-white py-2 px-5"
        onClick={async () => {
          await logout();
          window.localStorage.removeItem("connectorId");
        }}
      >
        Logout
      </button>
    </>
  );
}

export default Account;
