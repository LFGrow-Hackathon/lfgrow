import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByPost } from "@/lens/get-comments-of-post";
import FullPost from "./FullPost";
import CommentList from "@/components/comments/CommentList";

export const ViewPost = () => {
  const routeParam = useParams();
  const isMounted = useRef(false);
  const [queryRes, setQueryRes] = useState(false);
  const [postIdError, setPostIdError] = useState(false);

  useEffect(() => {
    isMounted.current = true;

    const query = async () => {
      const queryArguments = {
        commentArg: { commentsOf: routeParam.postId, limit: "50" },
        postArg: { publicationId: routeParam.postId },
      };
      try {
        const queryResponse = await getCommentsByPost(queryArguments);
        // console.log("queryResponse: ", queryResponse);
        if (isMounted.current) {
          setQueryRes(queryResponse);
        }
      } catch (gQLErrorRes) {
        if (isMounted.current) {
          console.log("call setPostIdError: ");
          setPostIdError(true);
        }
        console.log("Expected Error Of Invalid PostId");
        console.log("gQLErrorRes: ", gQLErrorRes);
      }
    };
    query();

    return () => {
      isMounted.current = false;
    };
  }, []);

  // console.log("routeParam: ", routeParam);
  // console.log("res data", queryRes);

  return (
    <>
      <div className="border rounded-md m-1 basis-4/5 flex justify-center flex-col items-center">
        {postIdError ? (
          <PostIdError />
        ) : !queryRes ? (
          <p>Loading...</p>
        ) : (
          <>
            <FullPost postData={queryRes.post} />
            <CommentList commentsData={queryRes.comments} />
          </>
        )}
      </div>
      <div className="md:basis-1/4"></div>
    </>
  );
};

const PostIdError = () => {
  return (
    <>
      <div className="">
        <p>post id error</p>
      </div>
    </>
  );
};
