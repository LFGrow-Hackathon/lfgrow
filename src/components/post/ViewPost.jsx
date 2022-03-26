import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByPost } from "@/lens/get-comments-of-post";
import FullPost from "./FullPost";
import CommentList from "@/components/comments/CommentList";
import CommentPublication from "../comments/postComment";

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
      <div className="flex w-full mt-10 lg:max-w-[70%] px-4">
        <div className="rounded-md border-2 border-[#e1e8f7] m-1 w-full flex justify-center flex-col items-center">
          {postIdError ? (
            <PostIdError />
          ) : !queryRes ? (
            <p>Loading...</p>
          ) : (
            <>
              <FullPost postData={queryRes.post} />
              <CommentPublication pubId={routeParam.postId} />
              <CommentList commentsData={queryRes.comments} />
            </>
          )}
        </div>
      </div>
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
