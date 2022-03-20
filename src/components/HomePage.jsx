import { useMoralis } from "react-moralis";
import DisplayProfile from "@/components/DisplayProfile.jsx";

export default function HomePage() {
  const { account } = useMoralis();

  return <DisplayProfile address={account} />;
}
