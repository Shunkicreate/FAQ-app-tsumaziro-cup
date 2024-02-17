import { useEffect, useState } from "react";
import { ApiResponseArray, FAQ } from "../types";
import { azureAISearch } from "../utils/api";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useQuestion = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [defaultFaqs, setDefaultFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/faqs");
      const faqs = await res.json() as FAQ[];
      faqs.map(faq => {
        faq.pageTitle = constructUrl(faq.pageTitle)
      })
      localStorage.setItem("faqs", JSON.stringify(faqs));
      setDefaultFaqs(faqs.slice(0, 5));
      setIsLoading(false);
    })();
  }, []);

  const constructUrl = (path: string): string => {
    const baseUrl = "https://helpfeel.com/raksul/";
    return baseUrl + path;
  };

  const updateFaqs = (faqs: FAQ[], aiSearchResult: ApiResponseArray): FAQ[] => {
    // aiSearchResultからFAQオブジェクトの配列を作成
    const aiFaqs = aiSearchResult.map(result => ({
      question: result.questions[0], // 仮定として、questionsの最初の要素を使用
      pageTitle: result.link,
    }));
  
    // faqsの各要素を更新またはそのまま使用
    const updatedFaqs = faqs.map(faq => {
      const aiFaq = aiFaqs.find(aiFaq => aiFaq.question === faq.question);
      return aiFaq ? { ...faq, pageTitle: aiFaq.pageTitle } : faq;
    });
  
    // aiFaqsにあってfaqsにない要素を追加
    aiFaqs.forEach(aiFaq => {
      if (!updatedFaqs.some(faq => faq.question === aiFaq.question)) {
        updatedFaqs.push(aiFaq);
      }
    });
  
    return updatedFaqs;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setFaqs([]);
      return;
    }
    const faqs: FAQ[] = JSON.parse(localStorage.getItem("faqs") || "");
    const filteredFaqs = faqs.filter(faq =>
      faq.question.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFaqs(filteredFaqs);
  };

  const handleClickAISearch = async (query: string): Promise<void> => {
    azureAISearch(query).then((result) => {
      const updatedFaqs = updateFaqs(faqs, result);
      setFaqs(updatedFaqs);
    })
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleClickAISearch(input);
  }

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
