import { LightningBoltIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

export default function ProfileButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="inline-flex items-center mr-3 ml-3 px-5 py-2 text-base font-medium rounded-full text-black bg-white"
      onClick={() => navigate("/feed")}
    >
      <LightningBoltIcon className="mr-2 h-4 w-4" aria-hidden="true" />
      Feed
    </button>
  );
}
