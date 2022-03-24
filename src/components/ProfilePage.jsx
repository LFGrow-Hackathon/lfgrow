import Twitter from "@/assets/twitter_logo.png";

export default function ProfilePage() {
  return (
    <div className="grid-cols-12  w-full mt-10 px-4 sm:px-6 lg:px-8">
      <div className="grid-cols-6 ">
        <div className="flex">
          <div className="mr-4 flex-none">
            <img
              className="inline-block h-20 w-20 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div>
            <h4 className="text-lg font-bold">Name</h4>
            <a href="https://twitter.com/yanis_mezn" target="_blank">
              <img className="inline-block h-5 w-5" src={Twitter} alt="" />
            </a>
          </div>
          <div className="flex justify-end">
            <div className="">Hello</div>
          </div>
        </div>
      </div>
    </div>
  );
}
