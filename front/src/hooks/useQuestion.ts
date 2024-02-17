import { useEffect, useState } from "react";
import { FAQ } from "../types"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useQuestion = () => {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [defaultFaqs, setDefaultFaqs] = useState([]);
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
        const faqs:FAQ[] = JSON.parse(localStorage.getItem("faqs") || "");
        const filteredFaqs = faqs.filter((faq) => faq.question.toLowerCase().includes(e.target.value.toLowerCase()));
        setFaqs(filteredFaqs);
    };
    return { input, setInput, isLoading, faqs, defaultFaqs, handleInputChange };
}

export default useQuestion;