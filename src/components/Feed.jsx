import { getPublications } from "@/lens/get-publications";
import { useState, useEffect } from "react";
import SingleFeed from "./SingleFeed";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const reqData = { sortCriteria: "TOP_COMMENTED", limit: 30 };
    const res = await getPublications(reqData);
    let filterdPosts = res.explorePublications.items.filter(
      (singlePost) => singlePost.__typename == "Post"
    );
    console.log("filterdPosts: ", filterdPosts);
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
    // console.log("postDataObj: ", postDataObj);
    setPosts([...postDataObj]);
  }, []);
  return (
    <>
      {posts.length ? (
        posts.map((post, key) => {
          // console.log("postDataObj: ", post);
          return <SingleFeed data={post} key={key} />;
        })
      ) : (
        <>updating post</>
      )}
      {/* {console.log("posts: ", posts)} */}
    </>
  );
};

export default Feed;
