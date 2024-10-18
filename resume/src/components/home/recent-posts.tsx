import RecentSection from "./recent-section";
import PostCard from "./post-card";

const tempData = [
  {
    id: 1,
    title: "NextJS 프로젝트에 ShadCN 적용하기",
    subject: ["NextJS", "TailwindCSS"],
    posted_at: "2024-09-26",
    description: "ShadCN은 라이브러리가 아닌 컴포넌트의 모음입니다.",
  },
  {
    id: 2,
    title: "NestJS의 Architecture 분석하기",
    subject: ["NesgJS", "Express"],
    posted_at: "2024-09-26",
    description:
      "서비스 로직과 비즈니스 로직의 차이를 구분하고 NestJS에서 Module, Service, Controller가 각각 무엇을 하는지 알아봅시다.",
  },
  {
    id: 3,
    title: "TailwindCSS",
    subject: ["TailwindCSS"],
    posted_at: "2024-09-26",
    description: "CSS프레임 워크 TailwindCSS는 왜 유명해 졌을까",
  },
  {
    id: 4,
    title: "NextJS의 AppRoter는 어떤 방식으로 동작하는 지 예측해 보기",
    subject: ["NextJS", "react-router-dom"],
    posted_at: "2024-09-26",
    description: "편리하게 NextJS가 Routing해주는 것을 불편하게 만들어 보기",
  },
  {
    id: 5,
    title: "PostgreSQL 사용 경험",
    subject: ["PostgreSQL", "Database"],
    posted_at: "2024-09-26",
    description:
      "Supabase에서 제공하는 PostgreSQL과 Supabase-javascript-SDK에 대하여",
  },
];

const RecentPosts = () => {
  return (
    <RecentSection title="Recent posts" page="posts">
      {tempData.map((e) => {
        return (
          <PostCard
            key={e.id}
            title={e.title}
            subject={e.subject}
            posted_at={e.posted_at}
          >
            {e.description}
          </PostCard>
        );
      })}
    </RecentSection>
  );
};

export default RecentPosts;
