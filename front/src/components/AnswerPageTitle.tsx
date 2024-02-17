interface AnswerPageTitleProps {
    pageTitle: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const AnswerPageTitle = (props: AnswerPageTitleProps) => {
    const { pageTitle } = props;
    return (
        <div>
            <h1
                className="border-l-4 border-[#30C8D6] pl-2 text-3xl text-[#2B546A]"
                data-test="answer-title"
            >
                {pageTitle}
            </h1>
        </div>
    );
}

export default AnswerPageTitle;