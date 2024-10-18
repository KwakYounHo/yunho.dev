import Image from "next/image";

// components
import Information from "@/components/home/information";
import RecentPosts from "@/components/home/recent-posts";
import RecentProject from "@/components/home/recent-projects";

export default () => {
  return (
    <div
      className={"container my-6 flex flex-col gap-12"}
      id={"top-of-main-content"}
    >
      <div
        id="info-header"
        className={"grid md:grid-cols-[1fr_1fr] gap-6 md:gap-52"}
      >
        <Image
          src="https://www.gravatar.com/avatar/e3d305ca3dd159da2aeb67c8994cea36?s=400"
          width={220}
          height={220}
          className={"rounded drop-shadow-lg select-none justify-self-center"}
          alt="YunHo Kwak"
        />
        <Information />
      </div>
      <RecentPosts />
      <RecentProject />
    </div>
  );
};
