import { useNavigate } from "react-router-dom";
import createProfile from "lens/create-profile.js";
import { useState } from "react";

export default function ProfileCreation() {

  const [handle, setHandle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  var forbiddenCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,`<>/?]+/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (forbiddenCharacter.test(handle)) {
      alert("Special character are not allowed.");
      return false;
    }
    setIsLoading(true);
    const result = await createProfile(handle);

    if (result === false) {
      setIsLoading(false);
    } else {
      navigate(`/profile/${handle}`);
    }
    console.log("create profile: profile has been indexed", result);
    return true;
  };

  if (isLoading) {
    return (
      <div className="flex mt-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white m-auto" />
      </div>
    );
  }

  return (
    <div className="bg-white mt-16 max-w-md mx-auto px-10 shadow sm:rounded-3xl">
      <div className="flex flex-col px-4 items-center py-5 sm:pb-6 sm:pt-10">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{"You don't have a Lens profile yet"}</h3>
        <div className="mt-6 max-w-xl text-sm text-gray-500">
          <p>Choose your name to create it.</p>
        </div>
        <form className="mt-2 flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="w-full">
            <label htmlFor="email" className="sr-only">
              handle
            </label>
            <input
              type="handle"
              name="handle"
              id="handle"
              value={handle}
              className="shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-md border border-gray-300 rounded-md"
              placeholder="your_handle"
              onChange={(e) => {
                setHandle(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-lg font-medium rounded-full text-white bg-[#16C1E9] hover:bg-[#129EBF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
          >
            Create my profile
          </button>
        </form>
      </div>
    </div>
  );
}