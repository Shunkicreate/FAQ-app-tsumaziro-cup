import { Input } from '@chakra-ui/react'

interface MainInputProps {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MainInput = (props: MainInputProps): JSX.Element => {
    const { handleInputChange } = props
    return (
        <>
            <Input
                type="text"
                placeholder="Search"
                onChange={handleInputChange}
            />
        </>
    )
}

export default MainInput