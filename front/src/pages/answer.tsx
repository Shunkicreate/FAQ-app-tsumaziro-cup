import AnswerPageTitle from "../components/AnswerPageTitle";
import ReturnToTopPageButton from "../components/ReturnToTopPageButton";
import ShowAnswerPageContent from "../components/ShowAnswerPageContent";
import useAnswer from "../hooks/useAnswer";

export function AnswerPage(): JSX.Element {
  const {lines, pageTitle} = useAnswer();

  return (
    <>
      <div className="lg:max-w-[760px] px-8 py-6 shadow">
        <AnswerPageTitle pageTitle={pageTitle} />
        <ShowAnswerPageContent lines={lines} />
      </div>
      <ReturnToTopPageButton />
    </>
  );
}
