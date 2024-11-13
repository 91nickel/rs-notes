import { FunctionComponent, useState } from 'react'
import { Container, Input } from '@mantine/core'
import { useDebounceCallback } from '@mantine/hooks'

interface IProps {
    disabled: boolean
    onSearch: (text: string) => void
}
const SearchField: FunctionComponent<IProps> = ({disabled, onSearch}: IProps) => {
    const [searchValue, setSearchValue] = useState('');

    const delayedOnSearch = useDebounceCallback(() => onSearch(searchValue), 500)

    function handleChange (text: string) {
        setSearchValue(text)
        delayedOnSearch()
    }

    return (
        <>
            <Container px={0} mb={'md'}>
                <Input
                    placeholder="Поиск"
                    size={'md'}
                    value={searchValue}
                    disabled={disabled}
                    onInput={(e) => handleChange(e.currentTarget.value)}
                />
            </Container>
        </>
    )

}

export default SearchField
