import RecentSection from "./recent-section";
import PostCard from "./post-card";

const RecentPosts = () => {
  return (
    <RecentSection title="Recent posts" className={"px-3"}>
      <PostCard title="Latest Post" subject={["NextJS"]} posted_at="2024-09-26">
        넥스트에 대해 알아봅시다
      </PostCard>
    </RecentSection>
  );
};

export default RecentPosts;
