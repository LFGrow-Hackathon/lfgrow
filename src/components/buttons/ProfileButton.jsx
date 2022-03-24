import { UserIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

export default function ProfileButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="inline-flex items-center mr-3 ml-3 px-5 py-2 border border-black text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-gradient-to-r from-blue-400 via-purple-900 to-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => navigate("/profile")}
    >
      <UserIcon className="mr-2 h-4 w-4" aria-hidden="true" />
      My Profile
    </button>
  );
}
