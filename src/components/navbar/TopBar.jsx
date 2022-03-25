import { Outlet } from "react-router-dom";
import Account from "@/components/navbar/connect/Account.jsx";
import Search from '@/components/navbar/search/Search';

function TopBar() {
  return (
    <>
      <div className="relative flex grid grid-cols-12 max-w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="hidden col-start-2 col-span-1 sm:flex 2xl:col-start-4">
          <div className="flex items-center font-bold text-2xl text-white">
            Zilly
          </div>
        </div>
        <div className="col-start-2 col-span-8 sm:col-start-4 sm:col-span-7 lg:col-start-4 lg:col-span-6 2xl:col-start-5 2xl:col-span-3">
          <div className="flex items-center px-6 py-4 max-w-3xl mx-auto max-w-none mx-0 px-0">
            <Search />
          </div>
        </div>
        <div className="flex items-center col-end-13 col-span-2 sm:col-end-13 sm:col-span-1 lg:col-end-13 lg:col-span-2 2xl:col-end-12 2xl:col-span-3">
          <Account />
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default TopBar;