import lensLogo from "@/assets/lenslogo.png";
import { useNavigate } from "react-router-dom";

export default function SelectProfile({ profiles }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mt-10 max-w-3xl bg-white rounded-3xl px-16">
      <h3 className="flex my-7 text-lg justify-center leading-6 font-medium text-gray-900">Select your Lens profile</h3>
      <div className="max-w-xl max-h-72  overflow-auto mx-auto ">
        <nav className="h-full" aria-label="Directory">
          <ul role="list" className="relative z-0 divide-y divide-gray-200">
            {profiles.map((person) => (
              <li key={person.handle} className="bg-white">
                <button className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
                  onClick={() => {
                    window.localStorage.setItem("profileId", person.id);
                    navigate(`/profile/${person.handle}`);
                  }}>
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={person.picture === null ? lensLogo : person.picture} alt=""
                      onError={(e) => e.target.src = lensLogo} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{person.handle}</p>
                    <p className="text-sm text-gray-500 truncate">Followers: {person.stats.totalFollowers}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}


