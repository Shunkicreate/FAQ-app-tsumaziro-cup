import {Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export function Layout(): JSX.Element {
  return (
    <div>
      <Header />
      <main className="h-[calc(100vh-8rem)] py-8 md:py-14 px-4 flex justify-center">
        <div className="w-full md:max-w-[760px]">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
