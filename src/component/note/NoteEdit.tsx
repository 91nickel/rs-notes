import SimpleMDE from 'react-simplemde-editor'
import { Container, Input } from '@mantine/core'
import { FunctionComponent } from 'react'
import { useNotes } from '@/hook/useNotes.tsx'
import { DEFAULT_NOTE_LIST_ITEM_NAME } from '@/component/note/NotesListItem.tsx'

const NoteEdit: FunctionComponent = () => {

    const {currentNote: note, handleChange} = useNotes()

    if (!note) {
        return ''
    }

    return (
        <div>
            <Container px={0} mb={'md'} fw={'bold'}>
                <Input
                    variant={'unstyled'}
                    placeholder={DEFAULT_NOTE_LIST_ITEM_NAME}
                    size={'xl'}
                    value={note.name}
                    onInput={(e) => handleChange({name: e.currentTarget.value})}
                />
            </Container>
            <SimpleMDE value={note.content} onChange={(value) => handleChange({content: value})}/>
        </div>
    )
}

export default NoteEdit