import { Outlet } from "react-router-dom";
import Account from "@/components/navbar/connect/Account.jsx";
import Search from '@/components/navbar/Search';

function TopBar() {
  return (
    <>
      <div className="relative flex grid sm:grid-cols-8 xl:grid-cols-12 max-w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="flex sm:ml-12 sm:col-start-1 sm:col-span-1 xl:col-start-2 xl:col-span-2 2xl:col-start-3">
          <div className="flex-shrink-0 flex items-center font-bold text-2xl text-white">
            Zilly
          </div>
        </div>
        <div className="sm:col-start-3 sm:col-span-4 xl:col-span-6 2xl:col-span-4">
          <div className="flex items-center px-6 py-4 max-w-3xl mx-auto max-w-none mx-0 px-0">
            <Search />
          </div>
        </div>
        <div className="flex items-center sm:col-end-9 xl:col-end-12 2xl:col-end-11 col-span-1">
          <Account />
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default TopBar;