import { useNotes } from '@/hook/useNotes.tsx'
import { DEFAULT_NOTE_LIST_ITEM_CONTENT, DEFAULT_NOTE_LIST_ITEM_NAME } from '@/component/note/NotesListItem.tsx'
import { marked } from 'marked'

const NoteView = () => {
    const {currentNote, toEdit} = useNotes()

    if (!currentNote) {
        return 'Заметка не найдена'
    }

    const name = currentNote.name || DEFAULT_NOTE_LIST_ITEM_NAME
    const content = currentNote.content || DEFAULT_NOTE_LIST_ITEM_CONTENT
    const __html = marked.parse(content) as string

    return (
        <div onClick={toEdit}>
            <h1>{name}</h1>
            <div dangerouslySetInnerHTML={{ __html }}></div>
        </div>
    )
}

export default NoteView
