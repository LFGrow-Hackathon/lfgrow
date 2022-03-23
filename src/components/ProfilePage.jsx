export default function ProfilePage() {
  return (
    <div className="max-w-7xl mt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex">
          <div className="mr-4 flex-none">
            <img
              className="inline-block h-14 w-14 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div>
            <h4 className="text-lg font-bold">Name</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
