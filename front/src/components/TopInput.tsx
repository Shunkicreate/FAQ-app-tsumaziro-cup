import wanko from "@/assets/wanko.svg";
import prompt from "@/assets/prompt.svg";

interface TopInputProps {
    input: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TopInput = (props: TopInputProps): JSX.Element => {
    const { input, handleInputChange } = props;
    return (
        <div className="flex flex-col">
            <div className="flex justify-center">
                <div className="relative w-96">
                    <img src={wanko} alt="wanko" />
                    <img
                        src={prompt}
                        alt="prompt"
                        className="absolute bottom-2 left-[4rem] md:left-[6rem]"
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter the keyword"
                    data-test="search-input"
                    className="w-full sm:w-[36rem] h-12 px-4 py-3 shadow outline-0"
                ></input>
            </div>
        </div>
    );
}

export default TopInput;