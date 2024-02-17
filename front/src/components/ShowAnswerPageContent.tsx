import {Lines} from "../types";

interface ShowAnswerPageContentProps {
  lines: Lines;
}

const ShowAnswerPageContent = (
  props: ShowAnswerPageContentProps,
): JSX.Element => {
  const {lines} = props;
  return (
    <div className="mt-4">
      {lines.map(line => (
        <div key={line.id} className="text-lg text-[#2B546A] leading-9">
          {line.text}
        </div>
      ))}
    </div>
  );
};

export default ShowAnswerPageContent;
