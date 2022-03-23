import { useMoralis } from "react-moralis";
import DisplayProfile from "@/components/DisplayProfile.jsx";
import createProfile from "@/lens/create-profile";
import CreatePublication from "@/components/publication/CreatePublication.jsx"
import { useState } from "react";


export default function HomePage() {
  const { account } = useMoralis();
  const [handle, setHandle] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    createProfile(handle);
  };

  return (
    <>
      <div className="px-10 py-5 max-w-lg">
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Choose your handle then hit enter
          </label>
          <div className="mt-1">
            <input
              type="handle"
              name="handle"
              id="handle"
              className="shadow-sm py-2 px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
              placeholder="handle"
              onChange={(e) => {
                setHandle(e.target.value);
              }}
            />
          </div>
        </form>
      </div>
      <CreatePublication />
      <DisplayProfile address={account} />
    </>
  );
}
