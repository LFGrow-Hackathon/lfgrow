import { LightningBoltIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

export default function ProfileButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="inline-flex items-center w-fit mr-3 ml-10 px-5 py-2 text-base font-medium rounded-full text-black bg-white"
      onClick={() => navigate("/")}
    >
      <LightningBoltIcon className="mr-2 h-5 w-5" aria-hidden="true" />
      Feed
    </button>
  );
}
