import {ListItem, UnorderedList, useColorModeValue} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FAQ} from "../types";

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
      {input === "" ? (
        <span className="text-[#2B546A] text-base">
          Frequently Asked Questions
        </span>
      ) : (
        <span className="text-[#2B546A] text-base">{`${items.length} questions matched`}</span>
      )}
      <UnorderedList p={4}>
        {items.map(faq => (
          <ListItem
            key={faq.question}
            pl={2}
            py={2}
            color={color}
            _hover={{bg: hoverColor}}
            className="text-lg text-[#2B546A] list-inside list-square marker:text-[#57D5C1] rounded-md"
          >
            <Link to={`/pages/${faq.pageTitle}`}>{faq.question}</Link>
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
