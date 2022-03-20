import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Outlet, Routes, Route, NavLink } from "react-router-dom";
import Account from "@/components/Connect/Account.jsx";
import HomePage from "@/components/HomePage.jsx";
import { login } from "@/login/login-users.js"

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

  function Layout() {
    return (
      <div>
        <div className="flex justify-center items-center space-x-10 p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <NavLink to="/" className="text-white text-xl font-bold">
            Home
          </NavLink>
          <Account />
          <button 
            className="text-gray-500 text-xl font-bold rounded-full bg-white py-2 px-5"
            onClick={login}>
              Connect to Lens
          </button>
        </div>
        <Outlet />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
