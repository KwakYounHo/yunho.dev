import RecentSection from "./recent-section";
import ProjectCard from "./project-card";

const projects = [
  {
    id: 1,
    title: "Poke X Digi",
    period: {
      start: "2023-03-06",
      end: "2023-05-10",
      isInProgress: false,
    },
    stack: [
      "Javascript",
      "MySQL",
      "Node.js",
      "bcrypt",
      "JWT",
      "Socket.io",
      "Github",
      "AWS",
    ],
    reference: {
      detail:
        "https://kwakyunho.notion.site/Poke-X-Digi-0bfb3c68b2f647cca43353cec4dd3f23",
      github: "https://github.com/KwakYounHo/KDT-2-Project-C-2",
    },
    description:
      "가상의 캐릭터로 다른 플레이어와 미니게임 및 소통을 즐기는 소셜 커뮤니티 플랫폼",
  },
  {
    id: 2,
    title: "Poke X Digi",
    period: {
      start: "2023-03-06",
      end: "2023-05-10",
      isInProgress: false,
    },
    stack: [
      "Javascript",
      "MySQL",
      "Node.js",
      "bcrypt",
      "JWT",
      "Socket.io",
      "Github",
      "AWS",
    ],
    reference: {
      detail:
        "https://kwakyunho.notion.site/Poke-X-Digi-0bfb3c68b2f647cca43353cec4dd3f23",
      github: "https://github.com/KwakYounHo/KDT-2-Project-C-2",
    },
    description:
      "가상의 캐릭터로 다른 플레이어와 미니게임 및 소통을 즐기는 소셜 커뮤니티 플랫폼",
  },
  {
    id: 3,
    title: "Poke X Digi",
    period: {
      start: "2023-03-06",
      end: "2023-05-10",
      isInProgress: false,
    },
    stack: [
      "Javascript",
      "MySQL",
      "Node.js",
      "bcrypt",
      "JWT",
      "Socket.io",
      "Github",
      "AWS",
    ],
    reference: {
      detail:
        "https://kwakyunho.notion.site/Poke-X-Digi-0bfb3c68b2f647cca43353cec4dd3f23",
      github: "https://github.com/KwakYounHo/KDT-2-Project-C-2",
    },
    description:
      "가상의 캐릭터로 다른 플레이어와 미니게임 및 소통을 즐기는 소셜 커뮤니티 플랫폼",
  },
];

const RecentProject = () => {
  return (
    <RecentSection title="Resent project" page="project">
      {projects.map((project) => {
        const { id, title, period, stack, reference, description } = project;
        return (
          <ProjectCard
            key={id}
            title={title}
            period={period}
            stack={stack}
            reference={reference}
          >
            {project.description}
          </ProjectCard>
        );
      })}
    </RecentSection>
  );
};

export default RecentProject;
