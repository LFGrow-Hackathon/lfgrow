import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Outlet, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "@/components/HomePage.jsx";
import Welcome from "@/components/welcome/Welcome";
import TopBar from "@/components/navbar/TopBar";
import Sidebar from "@/components/navbar/Sidebar";
import Feed from "@/components/feed/Feed";
import ProfilePage from "@/components/ProfilePage";
import DiscoverCommunities from "./components/DiscoverCommunities";

function App() {
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    account,
  } = useMoralis();

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

  return (
    <Routes>
      <Route element={<TopBar />}>
        <Route element={<Sidebar />}>
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
