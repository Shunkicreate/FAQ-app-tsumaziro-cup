import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Page, Lines } from "../types";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAnswer = () => {
    const {pageTitle} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [lines, setLines] = useState<Lines>([]);
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
    return {isLoading, lines, pageTitle};
}

export default useAnswer;