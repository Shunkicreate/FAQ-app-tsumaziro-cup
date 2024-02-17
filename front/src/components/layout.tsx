import {Outlet} from "react-router-dom";
import progateLogo from "../assets/progate_logo.svg";
import helpfeelLogo from "../assets/helpfeel_logo.svg";
import {ImCross} from "react-icons/im";
import {Button, useColorMode} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

export function Layout(): JSX.Element {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <div>
      <header className="flex h-8 m-4 items-center">
        <img src={progateLogo} alt="progate logo" className="h-full" />
        <ImCross className="h-3 mx-2" />
        <img src={helpfeelLogo} alt="helpfeel logo" className="h-full" />
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </header>
      <main className="h-[calc(100vh-8rem)] py-8 md:py-14 px-4 flex justify-center">
        <div className="w-full md:max-w-[760px]">
          <Outlet />
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 z-20 w-full pt-12 px-4">
        <div className="flex justify-center text-base">
          <span>&copy; 2014 Progate, Inc.</span>
        </div>
        <div className="flex justify-end mt-6 text-sm text-[#AAAAAA]">
          <span>Powered by Helpfeel</span>
        </div>
      </footer>
    </div>
  );
}
