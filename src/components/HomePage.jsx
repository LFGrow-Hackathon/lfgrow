import { useMoralis } from "react-moralis";
import DisplayProfile from "@/components/DisplayProfile.jsx";
import CreatePublication from "@/components/CreatePublication.jsx";
import { useState } from "react";

export default function HomePage() {
  const { account } = useMoralis();

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <DisplayProfile address={account} />
      <CreatePublication />
    </div>
  );
}
