import AnswerPageTitle from "../components/AnswerPageTitle";
import Loading from "../components/Loading";
import ReturnToTopPageButton from "../components/ReturnToTopPageButton";
import ShowAnswerPageContent from "../components/ShowAnswerPageContent";
import useAnswer from "../hooks/useAnswer";

export function AnswerPage(): JSX.Element {
  const { isLoading, lines, pageTitle } = useAnswer();

  if (isLoading) {
    return <Loading />;
  }

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
