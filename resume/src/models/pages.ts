type Page = {
  [key: string]: {
    href: string;
    title: string;
  };
};

export const pages: Page = {
  resume: {
    href: "/about",
    title: "about",
  },
};
