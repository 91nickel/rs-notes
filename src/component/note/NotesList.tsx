import { Note } from '.'
import { Flex, UnstyledButton } from '@mantine/core'
import { useNotes } from '@/hook/useNotes.tsx'

const NoteList = () => {
    const {
        list,
        isLoading,
        toView,
    } = useNotes()

    const isEmpty = !list.length

    if (isEmpty) {
        return <Flex p={0} justify={'center'} align={'center'} h={'100%'}>Нет заметок</Flex>
    }

    return (
        <>
            {list.map((item) => (
                <UnstyledButton
                    key={`note_${item.id}`}
                    miw="100%"
                    w="100%"
                    disabled={isLoading}
                    onClick={() => toView(item.id)}
                >
                    <Note.ListItem  {...item} />
                </UnstyledButton>
            ))}
        </>
    )
}

export default NoteList
