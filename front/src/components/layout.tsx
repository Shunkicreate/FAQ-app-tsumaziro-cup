import {Outlet} from "react-router-dom";
import Header from "./Header";

export function Layout(): JSX.Element {
  return (
    <div>
      <Header />
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
