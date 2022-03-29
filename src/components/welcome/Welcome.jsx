import { useState, useEffect } from "react";
import getProfiles from "lens/get-profiles.js";
import { useMoralis } from "react-moralis";
import SelectProfiles from "./SelectProfile.jsx";
import ProfileCreation from "./ProfileCreation.jsx";

export default function Welcome() {

  const { account } = useMoralis();
  const [profilesLens, setProfilesLens] = useState();

  useEffect(() => {
    async function getProfile() {
      if (account) {
        const { profiles } = await getProfiles({ ownedBy: [account] });
        setProfilesLens(profiles.items);
      }
    };
    getProfile();
  }, [account]);

  //If the user already have a lens profile
  if (profilesLens?.length) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-[#15C1E9] via-[#CF6ACD] to-[#F35161]">
        <p className="flex justify-center pt-40 text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white">Welcome</p>
        <div className="flex justify-center">
          <SelectProfiles profiles={profilesLens} />
        </div>
      </div>
    );
  }

  //If the user doesn't have a lens profiles
  if (profilesLens?.length == 0) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-[#15C1E9] via-[#CF6ACD] to-[#F35161]">
        <p className="flex justify-center pt-40 text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white">Welcome</p>
        <div className="flex justify-center">
          <ProfileCreation />
        </div>
      </div>
    );
  }

  //Display this when loading Lens info
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#15C1E9] via-[#CF6ACD] to-[#F35161]">
      <p className="flex justify-center pt-40 text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white">Welcome</p>
      <div className="flex flex-col mt-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white m-auto" />
        <p className="flex justify-center mt-5 text-lg text-white">Loading your profiles</p>
      </div>
    </div>
  );
}


