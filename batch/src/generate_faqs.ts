import fs from "fs/promises";
import path from "path";

type Project = {
  projectName: string;
  pages: Page[];
};
type Page = {
  title: string;
  lines: Array<{
    text: string;
  }>;
};
type FAQ = {
  question: string;
  pageTitle: string;
};

const QUESTION_TEXT_PREFIX = "? ";
const DATA_DIR_PATH = path.resolve(__dirname, "..", "..", "data");
const FAQS_FILE_PATH = path.resolve(
  DATA_DIR_PATH,
  process.env.FAQS_FILE_NAME as string,
);

const generateQuestionCombinations = (questionPattern: string): string[] => {
  const optionRegex = /\(([^)]+)\)/g;
  let match;
  // オプション部分と固定テキスト部分を混在させた新しい配列を作成
  const mixedParts: Array<string | string[]> = [];
  let lastIndex = 0;

  while ((match = optionRegex.exec(questionPattern)) !== null) {
    // オプションの前の固定テキスト部分を追加
    if (lastIndex < match.index) {
      mixedParts.push(questionPattern.substring(lastIndex, match.index));
    }
    // オプション部分を配列として追加
    mixedParts.push(match[1].split("|"));
    lastIndex = match.index + match[0].length;
  }
  // 最後の固定テキスト部分を追加
  if (lastIndex < questionPattern.length) {
    mixedParts.push(questionPattern.substring(lastIndex));
  }

  // 全ての組み合わせを生成
  const generateCombinations = (
    parts: Array<string | string[]>,
    index = 0,
    path = "",
  ): string[] => {
    if (index === parts.length) {
      return [path];
    }

    const part = parts[index];
    if (typeof part === "string") {
      // 固定テキストの場合、現在のパスに追加
      return generateCombinations(parts, index + 1, path + part);
    } else {
      // オプション配列の場合、各オプションに対して組み合わせを生成
      return part.flatMap(option =>
        generateCombinations(parts, index + 1, path + option),
      );
    }
  };

  return generateCombinations(mixedParts);
};
/**
 * Generate FAQs data.
 */
// Faqデータを生成する
const main = async (): Promise<void> => {
  const projectName = process.env.SCRAPBOX_PROJECT_NAME as string;
  const titles = await getPageTitles(projectName);
  const faqs: FAQ[] = [];
  // do not run in parallel to avoid overloading the Scrapbox API.
  for (const title of titles) {
    faqs.push(...(await convertPageToFaqs(projectName, title)));
  }
  await storageFaqs(faqs);
  console.log("generate faqs successfully!");
};

/**
 * Returns the page titles of the specified project.
 * @param projectName
 * @return page titles
 */
// Scrapboxのプロジェクトのページタイトルを取得する
const getPageTitles = async (projectName: string): Promise<string[]> => {
  const res = await fetch(`https://scrapbox.io/api/pages/${projectName}`);
  const project = (await res.json()) as Project;
  const pages = project.pages;
  return pages.map(page => page.title);
};

/**
 * Convert from text contained on a specific page to FAQs
 * @param projectName
 * @param pageTitle
 * @return faqs
 */
// ScrapboxのページのテキストをFAQに変換する
const convertPageToFaqs = async (
  projectName: string,
  pageTitle: string,
): Promise<FAQ[]> => {
  const res = await fetch(
    `https://scrapbox.io/api/pages/${projectName}/${pageTitle}`,
  );
  const page = (await res.json()) as Page;
  // 一時的に全てのFAQを格納する配列
  let allFaqs: FAQ[] = [];
  page.lines
    // exclude first line because it is page title.
    .slice(1)
    // exclude lines that are not the target of questions.
    .filter(line => line.text.trim().startsWith(QUESTION_TEXT_PREFIX))
    // remove prefix of question text.
    .map(line => line.text.replace(QUESTION_TEXT_PREFIX, ""))
    // 質問文内に () で囲まれた文字列がある場合、その文字列を | で区切った文字列のリストとして扱います。
    .forEach(questionText => {
      // 質問文を変換して複数の質問を生成
      const questions = generateQuestionCombinations(questionText);
      // 生成された各質問に対してFAQオブジェクトを作成
      const faqs = questions.map(question => ({
        question,
        pageTitle,
      }));
      // 生成されたFAQオブジェクトをallFaqs配列に追加
      allFaqs = allFaqs.concat(faqs);
    });
  return allFaqs;
};

/**
 * Store FAQs in a file.
 * @param faqs
 */
// Faqの配列をファイルに保存する
const storageFaqs = async (faqs: FAQ[]): Promise<void> => {
  await fs.mkdir(DATA_DIR_PATH, {recursive: true});
  await fs.writeFile(FAQS_FILE_PATH, JSON.stringify(faqs));
};

main();
