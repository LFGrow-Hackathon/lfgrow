import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Routes, Route } from "react-router-dom";
import HomePage from "components/HomePage.jsx";
import Welcome from "components/welcome/Welcome";
import TopBar from "components/navbar/TopBar.jsx";
import Feed from "components/feed/Feed.jsx";
import ProfilePage from "components/profile/ProfilePage.jsx";
import EditProfile from "components/profile/EditProfile.jsx";
import DiscoverCommunities from "./components/communities/DiscoverCommunities.jsx";
import CommunityPage from "./components/communities/CommunityPage.jsx";
import { ViewPost } from "components/post/ViewPost.jsx";

function App() {
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
  } = useMoralis();

  /* ------------------------------- 
  Enable Web3 provider if the user isn't authentificated
  ---------------------------------*/
  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (
      window.ethereum &&
      isAuthenticated &&
      !isWeb3Enabled &&
      !isWeb3EnableLoading
    ) {
      enableWeb3({ provider: connectorId });
    }
  }, [isAuthenticated, isWeb3Enabled]);

  // to delete
  // asks the user for permission to change network to polygon mumbain testnet if other network is detected
  useEffect(() => {
    if (window.ethereum) {
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
    }
  }, []);

  return (
    <Routes>
      <Route element={<TopBar />}>
        <Route path="/" element={<Feed size="max-w-[70%]" />} />
        <Route path="/home" element={<HomePage size="max-w-[70%]" />} />
        <Route path="/profile/:handle" element={<ProfilePage />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/communities" element={<DiscoverCommunities />} />
        <Route path="/communities/:id" element={<CommunityPage />} />
        <Route path="/post/:postId" element={<ViewPost />} />
      </Route>
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
}

export default App;
