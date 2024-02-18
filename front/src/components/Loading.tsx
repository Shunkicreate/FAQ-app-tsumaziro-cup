import {Image, Box} from "@chakra-ui/react";
import wanko from "../assets/wanko.svg";
import wantkoLoading from "../assets/wanko_question.svg";

interface LoadingProps {
  isLoading: boolean;
}

const Loading = (props: LoadingProps): JSX.Element => {
  return (
    <div>
      {props.isLoading ? (
        <Box w="32" h="24" className="relative animate-tilt">
          <img src={wantkoLoading} alt="Loading animation" />
        </Box>
      ) : (
        <Box w="32" h="24">
          <Image src={wanko} alt="wanko" />
        </Box>
      )}
    </div>
  );
};
export default Loading;

// tsxにcssを埋め込む
