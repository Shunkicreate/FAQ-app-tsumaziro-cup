import progateLogo from "../assets/progate_logo.svg";
import helpfeelLogo from "../assets/helpfeel_logo.svg";
import {ImCross} from "react-icons/im";
import {Button, useColorMode} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";
const Header = (): JSX.Element => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <header className="flex h-8 m-4 items-center justify-between">
      <Link className="h-full flex" to={"/"} tabIndex={0}>
        <img src={progateLogo} alt="progate logo" className="h-full" />
        <ImCross className="h-3 mx-2 my-auto" />
        <img src={helpfeelLogo} alt="helpfeel logo" className="h-full" />
      </Link>
      <Button onClick={toggleColorMode} tabIndex={0}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </header>
  );
};

export default Header;
