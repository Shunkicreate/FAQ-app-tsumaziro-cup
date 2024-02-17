import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Loading from "../components/Loading";
import ReturnToTopPageButton from "../components/ReturnToTopPageButton";
type Page = {
  lines: Array<{id: string; text: string}>;
};

export function AnswerPage(): JSX.Element {
  const {pageTitle} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [lines, setLines] = useState<Array<{id: string; text: string}>>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/pages/${pageTitle}`);
      const page = (await res.json()) as Page;
      const lines = page.lines
        // exclude the first line because it's the page title.
        .slice(1)
        // exclude lines that start with "? " because they are texts for questions.
        .filter(line => !line.text.startsWith("? "));
      setLines(lines);
      setIsLoading(false);
    })();
  }, [pageTitle]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="lg:max-w-[760px] px-8 py-6 shadow">
        <h1
          className="border-l-4 border-[#30C8D6] pl-2 text-3xl text-[#2B546A]"
          data-test="answer-title"
        >
          {pageTitle}
        </h1>
        <div className="mt-4">
          {lines.map(line => (
            <div key={line.id} className="text-lg text-[#2B546A] leading-9">
              {line.text}
            </div>
          ))}
        </div>
      </div>
      <ReturnToTopPageButton />
    </>
  );
}
