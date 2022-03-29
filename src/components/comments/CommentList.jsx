import Comment from "./Comment.jsx";

const CommentList = ({ commentsData }) => {
  return (
    <>
      {commentsData.items.map((data, key) => {
        return (
          <div className="w-full mt-5" key={key}>
            <div className="pl-5 pr-5">
              <ul role="list" className="divide-solid divide-y divide-gray-200">
                <Comment data={data} />
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CommentList;
