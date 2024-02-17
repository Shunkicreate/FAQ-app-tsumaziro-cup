import wanko from "@/assets/wanko.svg";
import prompt from "@/assets/prompt.svg";
import ShowUnorderedList from "../components/ShowUnorderdList";
import useQuestion from "../hooks/useQuestion";

export function TopPage(): JSX.Element {
  const { input, isLoading, faqs, defaultFaqs, handleInputChange } = useQuestion();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <div className="relative w-96">
            <img src={wanko} alt="wanko" />
            <img
              src={prompt}
              alt="prompt"
              className="absolute bottom-2 left-[4rem] md:left-[6rem]"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter the keyword"
            data-test="search-input"
            className="w-full sm:w-[36rem] h-12 px-4 py-3 shadow outline-0"
          ></input>
        </div>
      </div>
      <div className="mt-6 px-4 py-6 h-[calc(100%-12rem)] overflow-scroll shadow">
        {input === "" ? (
          <>
            <span className="text-[#2B546A] text-base">
              Frequently Asked Questions
            </span>
            <ShowUnorderedList items={defaultFaqs} />
          </>
        ) : (
          <>
            <span className="text-[#2B546A] text-base">{`${faqs.length} questions matched`}</span>
            <ShowUnorderedList items={defaultFaqs} />
          </>
        )}
      </div>
    </>
  );
}
