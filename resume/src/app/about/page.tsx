// ui components
import SkillCard from "./containers/SkillsCard";
import ContentSection from "./components/ContentSection";

// models
const briefIntro: string[] = [
  "무엇인가 만들어 내는 것을 좋아해서 개발을 시작하게 되었습니다.",
  "Javascript를 시작으로 개발 언어를 배웠으며, 지속적으로 차근차근 학습했습니다.",
  "능력 부족으로 원하는 일을 하지 못하는 상황이 생기지 않도록, 스스로를 지속적으로 성장시키는 것을 목표로 하고 있습니다.",
];
import {
  currentSkills,
  learningSkills,
  planedSkills,
} from "@/models/about/skills";
import AboutHeader from "./containers/AboutHeader";

const About = () => {
  return (
    <main className="container my-16 flex flex-col">
      {/* content-01 */}
      <div className={"flex flex-col items-center gap-4"}>
        <AboutHeader />
      </div>

      {/* content-02 */}
      <ContentSection title="brief-introduction" subTitle="간단 소개">
        <div className={"flex flex-col gap-1"}>
          {briefIntro.map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>
      </ContentSection>

      {/* content-03 */}
      <ContentSection title="skills" subTitle="기술 스택">
        <div className={"grid xl:grid-cols-3 gap-4"}>
          <SkillCard
            title="current"
            subTitle="습득한"
            content={currentSkills}
          />
          <SkillCard
            title="learning"
            subTitle="습득 중인"
            content={learningSkills}
          />
          <SkillCard
            title="planed"
            subTitle="습득 예정인"
            content={planedSkills}
          />
        </div>
        <p className={"mt-2 text-center text-muted-foreground"}>
          모든 카테고리는 이루고자 하는 목표에 ‘필요성’을 느끼게 되어 진행하고
          있습니다.
        </p>
      </ContentSection>

      {/* content-04 */}
      <ContentSection title="introduction" subTitle="소개">
        <div className="grid xl:grid-cols-2 gap-4 xl:gap-16">
          <div>
            <div className={"flex flex-row gap-2 mb-2 items-center"}>
              <h3 className={"capitalize text-xl font-semibold"}>Identity</h3>
              <p className={"text-sm text-muted-foreground"}>정체성</p>
            </div>
            <div className="border-l-2 border-foreground/50 pl-4">
              <p className={"py-4 font-bold"}>“아는 만큼 보인다”</p>
              <p>
                단순히 무엇인가 만드는 것이 좋았을 때는, 어떤 분야가 있는지
                자세히 알지 못했으며, 정체성을 찾기 어려웠습니다.
              </p>
              <p>
                하지만 웹 브라우저에서 동작하는 직접 작성한 코드를 보며 성취감과
                재미를 느끼며 점차 관심이 생기고, ‘웹 개발’이 하고 싶었습니다.
              </p>
              <p>
                그렇게 Node.js, React.js, Next.js를 중심으로 집중적으로 실력을
                향상시키기 시작하였습니다.
              </p>
              <br />
              <p>
                그렇게 프로젝트를 진행하며 스스로를 되돌아 보았을 때, 모든
                프로젝트에서 하나의 공통점이 있었고,
              </p>
              <p>그것은 바로 ‘애플리케이션의 시스템 구조’였습니다.</p>
              <p>
                말은 거창하지만 의미하는 바는 간단합니다. 하나의 프로젝트에서
                소스트리를 가독성 있게 유지하는 것이었습니다. 더욱 풀어 말하면
                ‘폴더링’입니다.
              </p>
              <p>
                목적과 역할에 따라 디렉토리를 나누고, 해당 기능을 수행하기 위한
                컴포넌트들을 연관된 것과 묶어서 관리하는 것에서 재미와 성취감을
                느끼는 것을 발견했습니다.
              </p>
              <br />
              <p>
                이런 부분에서 정리되지 않은 소스트리 혹은 정제되지 않은 데이터를
                정제하여 가용할 수 있는 자원으로 만들거나, 가독성을 증가시킬 때
                갈망이 해소되는 것을 느끼게 되었고,
              </p>
              <p>
                이는 나아가 ‘데이터 엔지니어’의 직무와 유사함을 느끼게
                되었습니다.
              </p>
              <br />
              <p>
                정제되지 않은 데이터를 어떤 기준에 의하여 분류를 하며, 분류된
                데이터를 정제하여 사용 가능한 데이터로 만들고, 이 흐름이 원활히
                수행될 수 있도록 자동화를 설계하며 체계를 만드는 것.
              </p>
              <br />
              <p>
                개발을 시작했던 초기 단순히 만드는 것이 좋았던 것 부터 시작하여,
                내가 작성한 코드들이 동작하는 것을 보며 흥미를 느끼고 나아가
                시스템의 구조를 체계화 하며 눈에 보기 쉬운 소스트리의 유지 및
                기능별 잘 정돈된 모듈 등을 보며 성취감을 느끼는 등
              </p>
              <p>
                초기엔 알지 못했지만 무엇인가 알아가며 정체성을 찾아가는 과정을
                보내 왔습니다. 현재는 데이터 엔지니어가 되기 위해 필요한 새로운
                기술과 갖추어야 할 역량에 대해 학습을 진행하고 있으며, 백엔드
                엔지니어를 시작으로 점차 확장하여 나아가고자 합니다.
              </p>
            </div>
          </div>
          <div>
            <div className={"flex flex-row gap-2 mb-2 items-center"}>
              <h3 className={"capitalize text-xl font-semibold"}>Values</h3>
              <p className={"text-sm text-muted-foreground"}>가치관</p>
            </div>
            <div className="border-l-2 border-foreground/50 pl-4">
              <p className={"py-4 font-bold"}>
                “흐름을 파악하고, 원리를 이해하는 것”
              </p>
              <p>
                흐름은 개발 뿐만이 아니라 모든 곳에서 매우 중요하다고 생각하는
                부분입니다.
              </p>
              <br />
              <p>
                어떤 이슈가 발생했을 때, 그 이슈의 발생 원인은 무엇인지,
                어디에서 발생했는지, 왜 발생했는지 탐구하고 해결할 수 있는지
                판단하며 해결하는 과정이 매우 중요하다고 생각하며,
              </p>
              <p>이 과정에서 매우 중요한 것은 ‘흐름’이라고 생각합니다.</p>
              <p>
                배관에 물이 잘 흐르고 있다가, 이물질로 인하여 어느 한 부분이
                막히게 되었을 때, 우리는 배관 속 이물질을 제거함으로써 다시 물을
                원활히 사용할 수 있게 됩니다.
              </p>
              <br />
              <p>
                배관 속 이물질을 제거하기 위한 작업은 간단하다고 생각하지
                않습니다.
              </p>
              <p>
                해당 배관이 다른 어떤 배관과 연관성이 있는지 고려해야 하며, 어느
                배관의 어느 위치에 이물질이 있는지도 파악해야 합니다. 또
                이물질을 제거하기 위해 배관 속 물을 비워두어야 하는데, 배관의
                어느 부분부터 어느 부분까지 물을 비워야 할지도 결정해야 합니다.
              </p>
              <p>
                이처럼 해당 배관에 대해 자세히 알고 있어야 신속하고 정확하게
                문제를 해결할 수 있습니다.
              </p>
              <br />
              <p>
                일례로, 저는 Next.js를 위주로 웹 개발을 진행하고 있었는데, 많은
                개발의 편의를 위해 자동화 된 기능들이 어떻게 동작하는 지가
                궁금해졌습니다. 그 중 ‘App Route’ 방식에 집중했습니다.
              </p>
              <p>
                어떻게 디렉토리 구조에 따라 자동화 된 페이지 라우팅이 진행되는
                것인지 동작 원리를 파악하고자 하였습니다.
              </p>
              <p>
                이런 생각을 가지게 된 뒤 다음으로 진행했던 프로젝트는 Next.js가
                아닌 React.js를 사용하여 개발을 진행했습니다.
              </p>
              <p>
                Next.js의 자동화 된 라우팅 방식을 생각하며,{" "}
                <code>react-router-dom</code>
                패키지를 활용하여 비슷한 구조를 만들고자 했으며,
              </p>
              <p>
                그렇게 진행했던 프로젝트에서는 Next.js가 페이지를 라우트하는
                방식에 대해 조금은 이해할 수 있었으며 동작 원리에 대한 이해 뿐만
                아니라 자동화 개념부분에서 코드를 작성할 수 있는 역량을 배우게
                되었습니다.
              </p>
              <br />
              <p>
                위 과정을 지속하며 발전하다 보면, 이슈에 대한 대처 및 신속하고
                정확한 해결을 해야할 때 ‘흐름과 동작 원리를 이해함’을 통해 조금
                더 유연하게 움직일 수 있다고 생각합니다.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>
    </main>
  );
};

export default About;
