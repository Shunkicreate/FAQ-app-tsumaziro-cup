type FAQ = {
    question: string;
    pageTitle: string;
};

type Page = {
    lines: Array<{id: string; text: string}>;
  };

type Lines = Array<{id: string; text: string}>;

export type { FAQ, Page, Lines };