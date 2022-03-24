import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Outlet, Routes, Route, NavLink } from "react-router-dom";
import Account from "@/components/Connect/Account.jsx";
import HomePage from "@/components/HomePage.jsx";
import Welcome from "./components/Welcome/welcome";
import Feed from "@/components/feed/Feed";
import ProfilePage from "@/components/ProfilePage";
import ProfileButton from "@/components/buttons/ProfileButton";
import FeedButton from "@/components/buttons/FeedButton";

function App() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  /* ------------------------------- 
  Enable Web3 provider if the user isn't authentificated
  ---------------------------------*/
  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      enableWeb3({ provider: connectorId });
    }
  }, [isAuthenticated, isWeb3Enabled]);

  // asks the user for permission to change network to polygon mumbain testnet if other network is detected
  useEffect(() => {
    (async () => {
      await window.ethereum.request({
        id: 1,
        jsonrpc: "2.0",
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x13881",
            rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            chainName: "Polygon Testnet Mumbai",
            nativeCurrency: {
              name: "tMATIC",
              symbol: "tMATIC", // 2-6 characters long
              decimals: 18,
            },
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          },
        ],
      });
    })();
  }, []);

  function TopBar() {
    return (
      <div>
        <div className="flex justify-center items-center space-x-10 p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <NavLink to="/" className="text-white text-xl font-bold">
            Home
          </NavLink>
          <NavLink to="/feed" className="text-white text-xl font-bold">
            Feed
          </NavLink>
          <Account />
          <NavLink to="/welcome" className="text-white text-lg font-bold ">
            Switch profile
          </NavLink>
        </div>
        <Outlet />
      </div>
    );
  }

  function SideBar() {
    return (
      <div className="flex">
        <div className="flex w-1/5 flex-col mt-10">
          <ProfileButton />
          <FeedButton />
        </div>
        <Outlet />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<TopBar />}>
        <Route element={<SideBar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
}

export default App;
