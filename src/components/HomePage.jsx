import { useMoralis } from "react-moralis";
import DisplayProfile from "@/components/DisplayProfile.jsx";
import CreatePublication from "@/components/publications/CreatePublication.jsx";
import { createMirror } from "../lens/mirror.js";

export default function HomePage() {
  const { account, Moralis } = useMoralis();
  const profileId = window.localStorage.getItem("profileId");

  const mirrorFunc = async () => {
    await createMirror(profileId);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <DisplayProfile address={account} />
      <CreatePublication />
      <button onClick={() => mirrorFunc()}>Test mirror</button>
    </div>
  );
}
