import { getPublications } from "@/lens/get-publications";
import { useState, useEffect, useRef } from "react";
import SingleFeed from "./SingleFeed";
import CreatePublication from "../publications/CreatePublication";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const isMounted = useRef(false);

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
          description: filterdPost?.profile?.bio
            ? filterdPost?.profile?.bio
            : "",
        },
        postContent: filterdPost?.metadata?.content,
        postMedia: filterdPost?.metadata?.media,
        postTimeStamp: filterdPost?.createdAt,
      }));

      if (isMounted.current) {
        setPosts([...postDataObj]);
      }
    };

    query();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="flex w-4/5 max-w-[60%] px-4">
      <div className="w-full h-full pl-5 pr-5 mt-10 bg-white border-2 border-[#e1e8f7] rounded-md place-content-center">
        <CreatePublication />
        {posts.length ? (
          posts.map((post, key) => {
            return <SingleFeed data={post} key={key} />;
          })
        ) : (
          <div className="flex flex-col mt-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black m-auto" />
            <p className="flex justify-center mt-5 text-lg text-black">
              Loading feed
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
