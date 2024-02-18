import animation from "./../assets/ninzya.gif";
import { Center, Box, Image, Text } from '@chakra-ui/react';

const Loading = (): JSX.Element => {
  return (
    <Center h="100vh"> {/* 画面全体をカバー */}
      <Box boxSize="sm" textAlign="center"> {/* コンテンツを中央に配置 */}
        {/* GIFのサイズを調整 */}
        <Image src={animation} alt="ローディング画面" />
        {/* 真ん中に文字を表示し、スタイルを適用 */}
        <Text fontSize="4xl" fontWeight="bold" color="#7679B7" mb={4}>
          Loading...
        </Text>
      </Box>
    </Center>
  );
};
export default Loading;
