import { Button, Input, Image, Stack, Box } from "@chakra-ui/react";
import wanko from "../assets/wanko.svg";

interface TopInputProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const TopInput = (props: TopInputProps): JSX.Element => {
  const { input, handleInputChange, handleInputSubmit } = props;
  return (
    <Stack spacing={4} align="center">
      <Box w="32">
        <Image src={wanko} alt="wanko" />
      </Box>
      <form onSubmit={handleInputSubmit} className="w-full">
        <Stack direction="row" align="center" w={{
          base: "80%",
          md: "70%",
        }} m={"0 auto"}>
          <Input
            type="search"
            value={input}
            onChange={handleInputChange}
            placeholder="例: メールマガジン"
            data-test="search-input"
            w="100%"
            h="12"
            px="4"
            py="3"
            shadow="md"
          />
          <Button colorScheme="WhiteAlpha" variant="outline" type="submit">
            検索
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default TopInput;
