import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = (): JSX.Element => {
  return (
    <Box as="footer" position="fixed" bottom="0" left="0" zIndex="20" w="full" pt="12" px="4">
      <Flex justifyContent="center" fontSize="sm">
        <Text>&copy; 2024- Shunki Tada, Masashi Kobayashi.</Text>
      </Flex>
    </Box>
  );
};

export default Footer;