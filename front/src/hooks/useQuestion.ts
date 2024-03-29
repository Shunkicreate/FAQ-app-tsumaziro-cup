import {useEffect, useState} from "react";
import {ApiResponseArray, FAQ} from "../types";
import {azureAISearch} from "../utils/api";
import isSearchable from "../utils/isSearchable";
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useQuestion = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const defaultQuery = searchParams.get("q") || "";
  const [input, setInput] = useState(defaultQuery);
  const [prevInputValue, setPrevInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const storedFaqs = localStorage.getItem("faqs");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [defaultFaqs, setDefaultFaqs] = useState<FAQ[]>(
    storedFaqs ? JSON.parse(storedFaqs) : [],
  );

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/faqs");
      const faqs = (await res.json()) as FAQ[];
      faqs.map(faq => {
        faq.genby = "scrapbox";
      });
      localStorage.setItem("faqs", JSON.stringify(faqs));
      setDefaultFaqs(faqs.slice(0, 5));
      await new Promise(resolve => setTimeout(resolve, 1300));
      setIsLoading(false);
      if (input !== "") {
        handleClickAISearch(input);
      }
    })();
  }, []);

  const updateFaqs = (faqs: FAQ[], aiSearchResult: ApiResponseArray): FAQ[] => {
    // aiSearchResultからFAQオブジェクトの配列を作成
    const aiFaqs: FAQ[] = aiSearchResult.map(result => ({
      question: result.questions[0], // 仮定として、questionsの最初の要素を使用
      pageTitle: result.link,
      genby: "ai",
    }));

    // faqsの各要素を更新またはそのまま使用
    const updatedFaqs: FAQ[] = faqs.map(faq => {
      const aiFaq = aiFaqs.find(aiFaq => aiFaq.question === faq.question);
      return aiFaq ? {...faq, pageTitle: aiFaq.pageTitle, genby: "ai"} : faq;
    });

    // aiFaqsにあってfaqsにない要素を追加
    aiFaqs.forEach(aiFaq => {
      if (!updatedFaqs.some(faq => faq.question === aiFaq.question)) {
        updatedFaqs.push(aiFaq);
      }
    });

    return updatedFaqs;
  };

  const handleURL = (url: string): void => {
    const newUrl = new URL(window.location.href);
    if (url) {
      newUrl.searchParams.set("q", url);
    } else {
      newUrl.searchParams.delete("q");
    }
    window.history.replaceState({}, "", newUrl.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    handleURL(inputValue);
    setInput(inputValue);

    if (!isSearchable(inputValue)) {
      setFaqs([]);
      return;
    }

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      //汎用検索関数に引っかからない場合，
      if (isSearchable(inputValue)) {
        // 前回の入力値と異なる場合，かつ空白でない場合
        if (
          inputValue.trim() !== prevInputValue.trim() &&
          inputValue.trim() !== ""
        ) {
          handleClickAISearch(inputValue);
          setPrevInputValue(inputValue);
        }
      }
    }, 3000);

    setTimer(newTimer);
    const faqs: FAQ[] = JSON.parse(localStorage.getItem("faqs") || "[]");
    const queries = inputValue.trim().split(/\s+/); // 半角・全角空白で分割

    const filteredFaqs = faqs.filter(faq =>
      queries.every(query =>
        faq.question.toLowerCase().includes(query.toLowerCase()),
      ),
    );

    setFaqs(filteredFaqs);
  };

  const handleClickAISearch = async (query: string): Promise<void> => {
    if (!isSearchable(query)) {
      window.alert("検索ワードを入力してください");
      return;
    }
    setIsLoading(true);
    azureAISearch(query).then(result => {
      const updatedFaqs = updateFaqs(faqs, result);
      setFaqs(updatedFaqs);
      window.history.replaceState({}, "", window.location.toString());
      // localStorage.setItem("faqs", JSON.stringify(updatedFaqs));
    });
    // 2秒待ってからisLoadingをfalseにする
    await new Promise(resolve => setTimeout(resolve, 1300));
    setIsLoading(false);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleClickAISearch(input);
    setPrevInputValue(input);
  };

  return {
    input,
    setInput,
    isLoading,
    setIsLoading,
    faqs,
    defaultFaqs,
    setDefaultFaqs,
    handleInputChange,
    handleInputSubmit,
  };
};

export default useQuestion;
