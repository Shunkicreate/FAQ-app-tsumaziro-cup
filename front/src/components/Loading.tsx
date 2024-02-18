import animation from "./../assets/ninzya.gif";
import {Center, Box, Image} from "@chakra-ui/react";

const Loading = (): JSX.Element => {
  return (
    <Center h="100vh">
      {" "}
      {/* 画面全体をカバー */}
      <Box boxSize="sm">
        {" "}
        {/* GIFのサイズを調整 */}
        <Image src={animation} alt="ローディング画面" />
      </Box>
    </Center>
  );
};
export default Loading;
