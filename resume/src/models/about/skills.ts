// skills models
export interface Skills {
  lang?: string[];
  libraryAndFramework?: string[];
  database?: string[];
  tools?: string[];
}
export const currentSkills: Skills = {
  lang: ["Javascript", "Typescript", "SQL"],
  libraryAndFramework: ["Node.js", "Express.js", "React.js", "Next.js"],
  tools: ["Vite.js", "Git"],
  database: ["MySQL", "PostgreSQL"],
};
export const learningSkills: Skills = {
  lang: ["Java", "Python", "SQL", "English"],
  tools: ["Git"],
};
export const planedSkills: Skills = {
  libraryAndFramework: ["Django", "Spring"],
  tools: ["AWS", "Linux"],
};
