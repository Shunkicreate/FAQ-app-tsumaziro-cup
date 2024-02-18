import {ListItem, UnorderedList, useColorModeValue} from "@chakra-ui/react";
import {FAQ} from "../types";
import isSearchable from "../utils/isSearchable";

type FAQListProps = {
  items: FAQ[];
  color: string;
  hoverColor: string;
  input: string;
};

const FAQList = ({
  items,
  color,
  hoverColor,
  input,
}: FAQListProps): JSX.Element => {
  return (
    <>
      {!isSearchable(input) ? (
        <span className="text-[#2B546A] text-base">よくある質問</span>
      ) : (
        <span className="text-[#2B546A] text-base">{`${items.length} questions matched`}</span>
      )}
      <UnorderedList p={4}>
        {items
          .sort((a, b) => {
            if (a.genby === "ai" && b.genby !== "ai") {
              return -1;
            }
            if (a.genby !== "ai" && b.genby === "ai") {
              return 1;
            }
            return 0;
          })
          .map((faq, i) => (
            <ListItem
              key={i}
              pl={2}
              py={2}
              color={color}
              _hover={{bg: hoverColor}}
              className="text-lg text-[#2B546A] list-inside list-square marker:text-[#57D5C1] rounded-md"
            >
              <a
                href={`${faq.pageTitle}`}
                tabIndex={i + 3}
                target="_blank"
                rel="noreferrer"
              >
                {faq.genby === "ai" ? (
                  <span className="bg-[#57D5C1] text-white px-2 py-1 rounded">
                    AI
                  </span>
                ) : (
                  ""
                )}
                <span> </span>
                {faq.question}
              </a>
            </ListItem>
          ))}
      </UnorderedList>
    </>
  );
};

const ShowUnorderedList = (props: {
  items: FAQ[];
  input: string;
}): JSX.Element => {
  const {items, input} = props;
  const color = useColorModeValue("#2B546A", "gray.300");
  const hoverColor = useColorModeValue("gray.200", "gray.900");
  return (
    <FAQList
      items={items}
      color={color}
      hoverColor={hoverColor}
      input={input}
    />
  );
};

export default ShowUnorderedList;
export {FAQList};
