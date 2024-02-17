import { Link, ListItem, UnorderedList, useColorModeValue } from "@chakra-ui/react";
type FAQ = {
    question: string;
    pageTitle: string;
};

type FAQListProps = {
    items: FAQ[];
    color: string;
    hoverColor: string;
  };

const FAQList = ({ items, color, hoverColor }: FAQListProps): JSX.Element => {
    return (
        <UnorderedList p={4}>
            {items.map((faq) => (
                <ListItem
                    key={faq.question}
                    pl={2}
                    py={2}
                    color={color}
                    _hover={{ bg: hoverColor }}
                    className="text-lg text-[#2B546A] list-inside list-square marker:text-[#57D5C1] rounded-md"
                >
                    <Link href={`/pages/${faq.pageTitle}`}>{faq.question}</Link>
                </ListItem>
            ))}
        </UnorderedList>
    );
};

const ShowUnorderedList = (props: { items: FAQ[] }): JSX.Element => {
    const { items } = props;
    const color = useColorModeValue("#2B546A", "gray.300");
    const hoverColor = useColorModeValue("gray.200", "gray.900");
    return <FAQList items={items} color={color} hoverColor={hoverColor} />;
};

export default ShowUnorderedList;
export { FAQList }