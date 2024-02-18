import {Link} from "react-router-dom";
import {Box, Flex, Image, IconButton, useColorMode} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {ImCross} from "react-icons/im";
import progateLogo from "../assets/progate_logo.svg";
import helpfeelLogo from "../assets/helpfeel_logo.svg";

const Header = (): JSX.Element => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Box as="header" w="full">
      <Flex h="8" m="4" alignItems="center" justifyContent="space-between">
        <Link to="/" tabIndex={0}>
          <Flex h="8" alignItems="center">
            <Image src={progateLogo} alt="Progate logo" h="8" />
            <ImCross className="mx-2" size="12px" />
            <Image src={helpfeelLogo} alt="Helpfeel logo" h="8" />
          </Flex>
        </Link>
        <IconButton
          onClick={toggleColorMode}
          tabIndex={0}
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />
      </Flex>
    </Box>
  );
};

export default Header;
