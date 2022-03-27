import { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleFeed from "./SingleFeed";
("react");
import { getMyPosts } from "@/lens/get-my-publications";

const MyFeed = ({ profileId }) => {
  console.log("profileId: ", profileId);
  const [posts, setPosts] = useState([]);
  const [zeroPost, setZeroPost] = useState();
  const [pageInfo, setPageInfo] = useState({});
  const [postCount, setPostCount] = useState();
  const [nextOffset, setNextOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const isMounted = useRef(false);

  const limit = 10;

  useEffect(() => {
    isMounted.current = true;
    console.log("useEffect Myfeed");
    setPosts([]);
    if (profileId) {
      query();
    }
    return () => {
      console.log("unmount useEffect MyFeed");
      isMounted.current = false;
    };
  }, [profileId]);

  const query = async (pageData) => {
    const reqArg = {
      profileId,
      limit,
      publicationTypes: "POST",
      ...pageData,
    };
    const res = await getMyPosts(reqArg);
    setPostCount(res.myPosts.pageInfo.totalCount);
    const filterdPosts = res.myPosts?.items?.filter(
      (item) => item.__typename == "Post"
    );
    setZeroPost(!res.myPosts?.items?.length);

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
      postStats: filterdPost?.stats,
    }));
    if (isMounted.current) {
      setPosts((prevPost) => [...prevPost, ...postDataObj]);
      // setPosts([...postDataObj]);
    }
    setPageInfo(res.myPosts.pageInfo);
  };

  const scrollNext = () => {
    // console.log("fetch netx");
    // console.log("limit: ", limit);
    // console.log("nextOffset: ", nextOffset);
    // console.log("postCount: ", postCount);
    setNextOffset((prev) => {
      limit + prev;
    });
    query({ cursor: pageInfo.next });
    const val = postCount > nextOffset;
    // console.log("val: ", val);
    setHasMore(val);
  };
  return (
    <>
      {posts.length ? (
        <InfiniteScroll
          dataLength={posts.length}
          hasMore={hasMore}
          next={scrollNext}
          loader={<></>}
        >
          {posts.map((post, key) => {
            return <SingleFeed data={post} key={key} />;
          })}
        </InfiniteScroll>
      ) : zeroPost ? (
        <div className="flex flex-col items-center mt-10">
          <p className="text-xl">No Posts Yet</p>
          <p className="text-lg text-slate-500">Try Posting</p>
        </div>
      ) : (
        <LoadingFeed />
      )}
    </>
  );
};

export default MyFeed;

const LoadingFeed = () => {
  return (
    <div className="flex flex-col mt-20">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black m-auto" />
      <p className="flex justify-center mt-5 text-lg text-black">
        Loading feed
      </p>
    </div>
  );
};
