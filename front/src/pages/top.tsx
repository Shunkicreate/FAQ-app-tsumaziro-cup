import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import wanko from "@/assets/wanko.svg";
import prompt from "@/assets/prompt.svg";
import { UnorderedList, ListItem, useColorModeValue } from "@chakra-ui/react";
type FAQ = {
  question: string;
  pageTitle: string;
};

export function TopPage(): JSX.Element {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [defaultFaqs, setDefaultFaqs] = useState<FAQ[]>([]);
  const color = useColorModeValue('#2B546A', 'gray.300')
  const hoverColor = useColorModeValue('gray.200', 'gray.900')

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/faqs");
      const faqs = await res.json();
      localStorage.setItem("faqs", JSON.stringify(faqs));
      setDefaultFaqs(faqs.slice(0, 5));
      setIsLoading(false);
    })();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setFaqs([]);
      return;
    }

    const faqs = JSON.parse(localStorage.getItem("faqs")!);
    const filteredFaqs = faqs.filter((faq: FAQ) =>
      faq.question.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFaqs(filteredFaqs);
  };

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
            <UnorderedList p={4}>
              {defaultFaqs.map(faq => (
                <ListItem
                  key={faq.question}
                  pl={2}
                  py={2}
                  color={color}
                  _hover={{ bg: hoverColor }}
                  className="text-lg text-[#2B546A] list-inside list-square marker:text-[#57D5C1] rounded-md"
                >
                  <Link to={`/pages/${faq.pageTitle}`}>{faq.question}</Link>
                </ListItem>
              ))}
            </UnorderedList>
          </>
        ) : (
          <>
            <span className="text-[#2B546A] text-base">{`${faqs.length} questions matched`}</span>
            <UnorderedList p={4}>
              {defaultFaqs.map(faq => (
                <ListItem
                  key={faq.question}
                  pl={2}
                  py={2}
                  color={color}
                  _hover={{ bg: hoverColor }}
                  className="text-lg text-[#2B546A] list-inside list-square marker:text-[#57D5C1] rounded-md"
                >
                  <Link to={`/pages/${faq.pageTitle}`}>{faq.question}</Link>
                </ListItem>
              ))}
            </UnorderedList>
          </>
        )}
      </div>
    </>
  );
}
