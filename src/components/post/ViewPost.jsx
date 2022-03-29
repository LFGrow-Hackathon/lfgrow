import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByPost } from "lens/get-comments-of-post.js";
import FullPost from "./FullPost.jsx";
import CommentList from "components/comments/CommentList.jsx";
import CommentPublication from "../comments/postComment.jsx";
import { createMirror } from "lens/mirror.js";
import { hasMirrored } from "lens/check-mirror.js";

export const ViewPost = () => {
  const routeParam = useParams();
  const isMounted = useRef(false);
  const [queryRes, setQueryRes] = useState(false);
  const [postIdError, setPostIdError] = useState(false);
  const ActiveProfileId = window.localStorage.getItem("profileId");
  const [loading, setLoading] = useState(false);
  const [mirrored, setMirrored] = useState("");
  const profileId = window.localStorage.getItem("profileId");
  const [mirrorsCount, setMirrorsCount] = useState("");

  const mirrorFunc = async (_postId) => {
    await createMirror(ActiveProfileId, _postId);
  };

  const checkMirror = async (_profileId, _postId) => {
    setLoading(true);
    const res = await hasMirrored(_profileId, [_postId]);
    setMirrored(res);
    setLoading(false);
  };

  useEffect(() => {
    if (profileId) {
      checkMirror(ActiveProfileId, routeParam.postId);
    }
  }, [loading]);

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
        if (isMounted.current) {
          setQueryRes(queryResponse);
          setMirrorsCount(queryResponse.post.stats.totalAmountOfMirrors);
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
        if (isMounted.current) {
          setQueryRes(queryResponse);
          setMirrorsCount(queryResponse.post.stats.totalAmountOfMirrors);
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
  }, [mirrored]);

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
              <FullPost
                postData={queryRes.post}
                mirrored={mirrored}
                mirrorFunc={mirrorFunc}
                mirrorsCount={mirrorsCount}
              />
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
