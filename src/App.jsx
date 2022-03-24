import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Outlet, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "@/components/HomePage.jsx";
import Welcome from "@/components/Welcome/welcome";
import TopBar from "@/components/navbar/TopBar"
import Feed from "@/components/feed/Feed";
import ProfilePage from "@/components/ProfilePage";
import ProfileButton from "@/components/buttons/ProfileButton";
import FeedButton from "@/components/buttons/FeedButton";

function App() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

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
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div>SIDEBAR STUFF</div>
          <ProfileButton />
          <FeedButton />
          <NavLink to="/" className="text-black text-xl font-bold">
            <button
              type="button"
              className="inline-flex items-center mr-3 ml-3 px-5 py-2 border border-black text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-gradient-to-r from-blue-400 via-purple-900 to-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Home
            </button>
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
        </Route>
      </Route>
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
}

export default App;
