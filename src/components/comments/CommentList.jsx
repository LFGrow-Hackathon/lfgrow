import Comment from "./Comment";

const CommentList = ({ commentsData }) => {
  // console.log("commentsData: ", commentsData);
  return (
    <>
      <div className="w-full mt-5">
        {commentsData.items.map((data, key) => {
          return (
            <div className="pl-5 pr-5">
              <ul role="list" className="divide-solid divide-y divide-gray-200">
                <Comment data={data} key={key} />{" "}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CommentList;
