import ShowUnorderedList from "../components/ShowUnorderdList";
import TopInput from "../components/TopInput";
import useQuestion from "../hooks/useQuestion";
import Loading from "../components/Loading";
import {useEffect, useState} from "react";
import {azureAISearch} from "../api/azureAISearch";

export function TopPage(): JSX.Element {
  const {
    input,
    isLoading,
    setIsLoading,
    faqs,
    defaultFaqs,
    setDefaultFaqs,
    handleInputChange,
  } = useQuestion();
  const [aiSearchResult, setAISearchResult] = useState<string>("");
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/faqs");
      const faqs = await res.json();
      localStorage.setItem("faqs", JSON.stringify(faqs));
      setDefaultFaqs(faqs.slice(0, 5));
      setIsLoading(false);
    })();
  }, []);

  const handleClickAISearch = async (): Promise<void> => {
    const result: string = await azureAISearch(input);
    setAISearchResult(result);
    return;
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <TopInput input={input} handleInputChange={handleInputChange} />
      <div className="flex justify-center">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter the keyword"
          data-test="search-input"
          className="w-full sm:w-[36rem] h-12 px-4 py-3 shadow outline-0"
        ></input>
        <button onClick={handleClickAISearch}>いでよAPI</button>
        <div>{aiSearchResult}</div>
      </div>
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
