export default function Poaps({ poaps }) {

  if (poaps?.length === 0) {
    return (<div className="w-full mt-5 p-2 bg-white border-2 border-[#e1e8f7] rounded-md text-md text-slate-500">
      POAPS
      <p className="py-5 italic">This user doesn't have any poap</p>
    </div>
    );
  }

  return (
    <div className="w-full mt-5 p-2 bg-white border-2 border-[#e1e8f7] rounded-md text-md text-slate-500">
      POAPS
      <ul
        role="list"
        className="grid grid-cols-1 mt-5 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {poaps &&
          poaps.map((poap, index) => (
            <li
              key={index}
              className="col-span-1 flex flex-col text-center bg-white rounded-lg"
            >
              <div className="flex-1 flex flex-col">
                <a style={{ display: "table-cell" }} href={`https://poap.gallery/event/${poap.event.id}`} target="_blank" rel="noreferrer" >
                  <img
                    className="w-12 h-12 flex-shrink-0 mx-auto rounded-full"
                    src={poap.event.image_url}
                    alt=""
                  />
                  {/* <h3 className="mt-1 text-gray-900 text-sm font-medium">
                    {poap.event.name}
                  </h3> */}
                </a>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
