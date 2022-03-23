import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Outlet, Routes, Route, NavLink } from "react-router-dom";
import Account from "@/components/Connect/Account.jsx";
import HomePage from "@/components/HomePage.jsx";
import Feed from "@/components/feed/Feed";

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
        </div>
        <Outlet />
      </div>
    );
  }

  function SideBar() {
    return (
      <div className="flex flex-row ">
        <div>
          SIDEBAR STUFF
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
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
