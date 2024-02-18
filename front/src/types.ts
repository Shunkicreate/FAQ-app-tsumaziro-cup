type FAQ = {
  question: string;
  pageTitle: string;
  genby: "scrapbox" | "ai";
};

type Page = {
  lines: Array<{id: string; text: string}>;
};

type Lines = Array<{id: string; text: string}>;

type ApiResponse = {
  "@search.score": number;
  link: string;
  questions: string[];
  AzureSearch_DocumentKey: string;
  keyphrases: string[];
};

type ApiResponseArray = ApiResponse[];

export type {FAQ, Page, Lines, ApiResponseArray};
