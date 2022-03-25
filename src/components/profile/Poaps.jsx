export default function Poaps() {
  const poaps = [
    {
      name: "Jan",
      title: "Paradigm Representative",
      role: "Admin",
      email: "janecooper@example.com1",
      telephone: "+1-202-555-0170",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      name: "Jae",
      title: "Paradigm Representative",
      role: "Admin",
      email: "janecooper@example.com2",
      telephone: "+1-202-555-0170",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      name: "Jne",
      title: "Paradigm Representative",
      role: "Admin",
      email: "janecooper@example.com3",
      telephone: "+1-202-555-0170",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      name: "ane",
      title: "Paradigm Representative",
      role: "Admin",
      email: "janecooper@example.com4",
      telephone: "+1-202-555-0170",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      name: "Janed",
      title: "Paradigm Representative5",
      role: "Admin",
      email: "janecooper@example.com",
      telephone: "+1-202-555-0170",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
  ];
  return (
    <div className="w-full mt-5 p-2 bg-white border-2 border-[#e1e8f7] rounded-md text-md text-slate-500">
      POAPS
      <ul
        role="list"
        className="grid grid-cols-1 mt-5 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {poaps.map((person) => (
          <li
            key={person.email}
            className="col-span-1 flex flex-col text-center bg-white rounded-lg"
          >
            <div className="flex-1 flex flex-col">
              <img
                className="w-13 h-13 flex-shrink-0 mx-auto rounded-full"
                src={person.imageUrl}
                alt=""
              />
              <h3 className="mt-1 text-gray-900 text-sm font-medium">
                {person.name}
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
