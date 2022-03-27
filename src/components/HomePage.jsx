import { useState, useEffect, useRef } from "react";
import CreatePublication from "@/components/publications/CreatePublication.jsx";
import { getTimeline } from "@/lens/get-timeline";
import SingleFeed from "@/components/feed/SingleFeed";

export default function HomePage({ size }) {
  const [posts, setPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [zeroPost, setZeroPost] = useState();
  const isMounted = useRef(false);
  const profileId = window.localStorage.getItem("profileId");

  useEffect(() => {
    isMounted.current = true;
    if (profileId) {
      query();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  const query = async (pageData) => {
    const reqData = { profileId, limit: 50, ...pageData };
    const res = await getTimeline(reqData);

    let filterdPosts = res.timeline.items.filter(
      (singlePost) =>
        singlePost.__typename == "Post" || singlePost.__typename == "Mirror"
    );
    // console.log("filterdPosts: ", filterdPosts);

    setZeroPost(!res.timeline?.items?.length);

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
          : "https://storageapi.fleek.co/c43ca3a0-c092-4d21-8877-4dc28180feca-bucket/undraw_profile_pic_ic-5-t.svg",
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
      setPageInfo(res.timeline.pageInfo);
    }
  };

  return (
    <div className={`flex w-full lg:${size} px-4`}>
      <div className="w-full h-full pl-5 pr-5 mt-10 bg-white border-2 border-[#e1e8f7] rounded-md place-content-center shadow-md">
        <CreatePublication />
        {posts.length ? (
          posts.map((post, key) => {
            return <SingleFeed data={post} key={key} />;
          })
        ) : zeroPost ? (
          <div className="flex flex-col items-center mt-10 p-3">
            <p className="text-xl">No Posts In Your Timeline</p>
            <p className="text-base text-slate-500">
              Try Posting or Follow Some One
            </p>
          </div>
        ) : (
          <Loding />
        )}
      </div>
    </div>
  );
}

const Loding = () => {
  return (
    <div className="flex flex-col mt-20">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black m-auto" />
      <p className="flex justify-center mt-5 text-lg text-black">
        Loading feed
      </p>
    </div>
  );
};
