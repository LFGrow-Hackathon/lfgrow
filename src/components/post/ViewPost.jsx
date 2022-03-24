import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByPost } from "@/lens/get-comments-of-post";

export const ViewPost = () => {
  const routeParam = useParams();
  const isMounted = useRef(false);
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
        console.log("queryResponse: ", queryResponse);
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

  console.log("routeParam: ", routeParam);

  return <>{postIdError ? <PostIdError /> : <div>FullPost</div>}</>;
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
