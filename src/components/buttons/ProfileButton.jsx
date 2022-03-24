import { UserIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

export default function ProfileButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="inline-flex items-center w-fit mr-3 mb-2 ml-10 px-5 py-2 border border-black text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] hover:border-white hover:text-white"
      onClick={() => navigate("/profile")}
    >
      <UserIcon className="mr-2 h-5 w-5" aria-hidden="true" />
      My Profile
    </button>
  );
}
