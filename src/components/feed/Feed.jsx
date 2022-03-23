import { getPublications } from "@/lens/get-publications";
import { useState, useEffect, useRef } from "react";
import SingleFeed from "./SingleFeed";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true;

    const query = async () => {
      const reqData = { sortCriteria: "TOP_COMMENTED", limit: 50 };
      const res = await getPublications(reqData);

      let filterdPosts = res.explorePublications.items.filter(
        (singlePost) => singlePost.__typename == "Post"
      );

      const postDataObj = filterdPosts.map((filterdPost) => ({
        profile: {
          name: filterdPost?.profile?.name?.length
            ? filterdPost?.profile?.name
            : filterdPost?.profile?.id,
          picture: filterdPost?.profile?.picture
            ? filterdPost?.profile?.picture?.original.url
            : "https://storageapi.fleek.co/c43ca3a0-c092-4d21-8877-4dc28180feca-bucket/undraw_profile_pic_ic-5-t.svg",
          description: filterdPost?.profile?.bio ? filterdPost?.profile?.bio : "",
        },
        postContent: filterdPost?.metadata?.content,
        postMedia: filterdPost?.metadata?.media,
        postTimeStamp: filterdPost?.createdAt,
      }));

      if (isMounted.current) {
        setPosts([...postDataObj]);
      }
    }

    query();

    return () => { isMounted.current = false };
  }, []);

  return (
    <>
      {posts.length ? (
        posts.map((post, key) => {
          return <SingleFeed data={post} key={key} />;
        })
      ) : (
        <>updating post</>
      )}
    </>
  );
};

export default Feed;
