import Comment from "./Comment";
const CommentList = ({ commentsData }) => {
  // console.log("commentsData: ", commentsData);
  return (
    <>
      <div className="w-full border ">
        {commentsData.items.map((data, key) => {
          return <Comment data={data} key={key} />;
        })}
      </div>
    </>
  );
};

export default CommentList;
