import { getPublications } from "lens/get-publications";
import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleFeed from "./SingleFeed.jsx";
import CreatePublication from "../publications/CreatePublication.jsx";
import defaultUserIcon from "assets/defaultUserIcon.png";

const Feed = ({ size }) => {
  const [posts, setPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    query();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const query = async (pageData) => {
    const reqData = { sortCriteria: "TOP_COMMENTED", limit: 10, ...pageData };
    const res = await getPublications(reqData);

    let filterdPosts = res.explorePublications.items.filter(
      (singlePost) => singlePost.__typename == "Post"
    );

    const postDataObj = filterdPosts.map((filterdPost) => ({
      profile: {
        name: filterdPost?.profile?.name?.length
          ? filterdPost?.profile?.name
          : filterdPost?.profile?.handle?.length
          ? filterdPost?.profile?.handle
          : filterdPost?.profile?.id,
        handle: filterdPost?.profile?.handle,
        picture: filterdPost?.profile?.picture
          ? filterdPost?.profile?.picture?.original.url
          : defaultUserIcon,
        description: filterdPost?.profile?.bio ? filterdPost?.profile?.bio : "",
      },
      postId: filterdPost?.id,
      postContent: filterdPost?.metadata?.content,
      postMedia: filterdPost?.metadata?.image,
      postTimeStamp: filterdPost?.createdAt,
      postStats: filterdPost.stats,
    }));

    if (isMounted.current) {
      setPosts((prevState) => {
        return [...prevState, ...postDataObj];
      });
      setPageInfo(res.explorePublications.pageInfo);
    }
  };

  return (
    <div className={`flex w-full lg:${size} px-4 flex-col`}>
      <div className="m-4 mt-8 self-center text-lg text-slate-500">
        Explore Public Feed
      </div>
      <div className="w-full h-full sm:px-5 place-content-center">
        <CreatePublication />
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
            loader={<></>}
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
      </div>
    </div>
  );
};

export default Feed;
