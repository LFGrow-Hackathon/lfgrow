import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Outlet, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "@/components/HomePage.jsx";
import Welcome from "@/components/welcome/Welcome";
import TopBar from "@/components/navbar/TopBar";
import Feed from "@/components/feed/Feed";
import ProfilePage from "@/components/ProfilePage";
import ProfileButton from "@/components/buttons/ProfileButton";
import FeedButton from "@/components/buttons/FeedButton";
import DiscoverCommunities from "./components/DiscoverCommunities";

function App() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, account } =
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

  function SideBar() {
    return (
      <div className="flex">
        <div className="flex w-1/5 flex-col mt-10">
          <ProfileButton />
          <FeedButton />
          <NavLink to="/home" className="inline-flex items-center w-fit mr-3 mb-2 ml-10 px-5 py-2 border border-black text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] hover:border-white hover:text-white">
            Home
          </NavLink>
          <NavLink to="/communities" className="inline-flex items-center w-fit mr-3 mb-2 ml-10 px-5 py-2 border border-black text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] hover:border-white hover:text-white">
            Communities
          </NavLink>
        </div>
        <Outlet />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<TopBar />}>
        <Route element={<SideBar />}>
          <Route path="/" element={<Feed />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/communities" element={<DiscoverCommunities />} />
        </Route>
      </Route>
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
}

export default App;
