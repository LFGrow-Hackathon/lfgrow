import { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleFeed from "./SingleFeed";
("react");
import { getMyPosts } from "@/lens/get-my-publications";

const MyFeed = () => {
  const [posts, setPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const isMounted = useRef(false);
  const profileId = window.localStorage.getItem("profileId");

  useEffect(() => {
    isMounted.current = true;
    console.log("useEffect Myfeed");
    query();
    return () => {
      console.log("unmount useEffect MyFeed");
      isMounted.current = false;
    };
  }, []);

  const query = async (pageData) => {
    const reqArg = { profileId, limit: 20, ...pageData };
    const res = await getMyPosts(reqArg);
    console.log("res: ", res);
    const filterdPosts = res.timeline?.items?.filter(
      (item) => item.__typename == "Post"
    );

    const postDataObj = filterdPosts.map((filterdPost) => ({
      profile: {
        name: filterdPost?.profile?.name?.length
          ? filterdPost?.profile?.name
          : filterdPost?.profile?.handle?.length
          ? filterdPost?.profile?.handle
          : filterdPost?.profile?.id,
        picture: filterdPost?.profile?.picture
          ? filterdPost?.profile?.picture?.original.url
          : "https://storageapi.fleek.co/c43ca3a0-c092-4d21-8877-4dc28180feca-bucket/undraw_profile_pic_ic-5-t.svg",
        description: filterdPost?.profile?.bio ? filterdPost?.profile?.bio : "",
      },
      postId: filterdPost?.id,
      postContent: filterdPost?.metadata?.content,
      postMedia: filterdPost?.metadata?.image,
      postTimeStamp: filterdPost?.createdAt,
    }));
    if (isMounted.current) {
      setPosts((prevPost) => [...prevPost, ...postDataObj]);
    }
    console.log("postDataObj: ", postDataObj);
    setPageInfo(res.timeline.pageInfo);
  };

  return (
    <>
      {posts.length ? (
        <InfiniteScroll
          dataLength={posts.length}
          hasMore={true}
          next={() => {
            console.log("fetch netx");
            query({
              cursor: pageInfo.next,
            });
          }}
          loader={<>{console.log("loadng")}</>}
        >
          {posts.map((post, key) => {
            return <SingleFeed data={post} key={key} />;
          })}
        </InfiniteScroll>
      ) : (
        <div className="flex flex-col mt-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black m-auto" />
          <p className="flex justify-center mt-5 text-lg text-black">
            Loading feed
          </p>
        </div>
      )}
    </>
  );
};

export default MyFeed;
