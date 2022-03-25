// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useMoralis } from "react-moralis";

export default function CommunityPage() {

  // let { id } = useParams();
  // const { Moralis } = useMoralis();

  // useEffect(() => {
  //   const Community = Moralis.Object.extend("Community");
  //   const query = new Moralis.Query(Community);
  //   query.equalTo();
  // }, []);

  return (
    <div className="flex w-4/5 lg:w-3/5">
      <div className="w-full mt-10 px-4 sm:px-4 lg:px-4">
        <div className="w-full flex mr-4 justify-between">
          <img
            className="inline-block h-20 w-20 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="w-full h-full pl-5 pr-5 mt-10 bg-white border-2 border-[#e1e8f7] rounded-md place-content-center">
          <div className="mt-5 p-3 rounded-md border-[#355DA8] border-2 font-bold bg-[#e2effa] min-h-10 opacity-75">
            Communities
          </div>

        </div>
      </div>
    </div>
  );
}