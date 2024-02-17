import { Link } from "react-router-dom";

const ReturnToTopPageButton = (): JSX.Element => {
    return (
        <div className="lg:max-w-[760px] mt-8 md:mt-14 flex justify-center">
        <button className="px-10 py-5 bg-[#57D5C1]">
          <Link to="/" className="text-white">
            &lt; Return to Top Page
          </Link>
        </button>
      </div>
    )
}

export default ReturnToTopPageButton;