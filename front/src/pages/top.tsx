import ShowUnorderedList from "../components/ShowUnorderdList";
import TopInput from "../components/TopInput";
import useQuestion from "../hooks/useQuestion";

export function TopPage(): JSX.Element {
  const {
    input,
    isLoading,
    faqs,
    defaultFaqs,
    handleInputChange,
    handleInputSubmit,
  } = useQuestion();

  return (
    <>
      <TopInput
        input={input}
        handleInputChange={handleInputChange}
        handleInputSubmit={handleInputSubmit}
        isLoading={isLoading}
      />
      <div className="mt-6 px-4 py-6 h-[calc(100%-12rem)] overflow-scroll shadow">
        {input === "" ? (
          <ShowUnorderedList items={defaultFaqs} input={input} />
        ) : (
          <ShowUnorderedList items={faqs} input={input} />
        )}
      </div>
    </>
  );
}
