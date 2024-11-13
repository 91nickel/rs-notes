import React, { createContext, FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useDebounceCallback } from '@mantine/hooks'
import { NoteService } from '@/service/note.service.ts'
import { INote, INoteUserFields } from '@/type/note'
import _ from 'lodash'
import { LayoutProps } from '@/type/layout.ts'
import { FirebaseService } from '@/service/firebase.service.ts'
// import { FirebaseService } from '@/service/firebase.service.ts'

interface INotesContext {
    toView: (id: INote['id']) => void
    toEdit: () => void

    isLoading: boolean
    isEditing: boolean
    count: number
    list: INote[]
    currentNoteId: INote['id']
    currentNote: INote | undefined

    handleCreateNewNote: () => void
    handleChange: (dto: Partial<INoteUserFields>) => void
    handleDelete: () => void
    handleSearch: (text: string) => void
}

const NotesContext: React.Context<INotesContext> = createContext({} as INotesContext)

const NotesProvider: FunctionComponent<LayoutProps> = ({children}) => {

    const [isInitiated, setIsInitiated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [list, setList] = useState([] as INote[])
    const [currentNoteId, setCurrentNoteId] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [search, setSearch] = useState('')

    const saveNotesList = useDebounceCallback(() => {
        setIsLoading(true)
        NoteService.save(list)
    }, 500)

    const initFromLocal = useDebounceCallback(() => {
        // console.log('initFromLocal')
        if (!isInitiated && !FirebaseService.connected) {
            // console.log('initFromLocal.isInitiated === false')
            NoteService.load()
                .then((list: INote[]) => {
                    console.log('DB from local', list)
                    handleDataFromStorage(list, true)
                })
        }
    }, 2000)

    useEffect(() => {
        NoteService.onDBChanged((list: INote[]) => {
            console.log('DB changed', list)
            handleDataFromStorage(list)
        })
        initFromLocal()
    }, [])

    function handleDataFromStorage (list: INote[], save = false) {
        if (list.length) {
            const notesSorted = _.orderBy(list, 'updatedAt', 'desc')
            setList(notesSorted)
            setCurrentNoteId(notesSorted[0].id)
        }
        setIsLoading(false)
        if (!isInitiated)
            setIsInitiated(true)
        if (save)
            saveNotesList()
    }

    function handleChange(dto: Partial<INoteUserFields>) {
        // console.log('handleChange', dto)
        const note = list.find(n => n.id === currentNoteId)
        if (!note) return

        setList(prevState => [
            {...note, ...dto, updatedAt: new Date()},
            ...prevState.filter(n => n.id !== currentNoteId),
        ])
        saveNotesList()
    }

    function handleCreateNewNote() {
        // console.log('handleCreateNewNote')
        const id = _.uniqueId() + Date.now()
        const createdAt = new Date()
        const updatedAt = new Date(createdAt.getTime())
        const note: INote = {id, name: '', content: '', createdAt, updatedAt}
        setList([note, ...list])
        setIsEditing(true)
        setCurrentNoteId(id)
    }

    function handleDelete() {
        // console.log('handleDelete()')
        const newList = list.filter(n => n.id !== currentNoteId)
        const nextNoteId = newList.length ? newList[0].id : ''
        setList(newList)
        setCurrentNoteId(nextNoteId)
        setIsEditing(false)
    }

    function handleSearch(text: string) {
        setSearch(text)
    }

    const sortedList: INote[] = useMemo<INote[]>(() => {
        if (!search) {
            return list
        }
        const regExp = new RegExp(`${search}`, 'i')
        return _.filter(list, (note: INote) => {
            return regExp.test(note.name) || regExp.test(note.content)
        })
    }, [search, list])

    const currentNote: INote | undefined = useMemo<INote | undefined>(() => {
        return sortedList.find(note => note.id === currentNoteId)
    }, [sortedList, currentNoteId])

    const value = {
        toView: (id: INote['id']) => {
            // console.log('toView', id)
            setCurrentNoteId(id)
            setIsEditing(false)
        },

        toEdit: () => {
            // console.log('toEdit')
            setIsEditing(true)
        },

        isLoading,
        isEditing,
        count: list.length,
        list: sortedList,
        currentNoteId,
        currentNote,

        handleCreateNewNote,
        handleChange,
        handleDelete,
        handleSearch,
    }

    return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
}

export default {
    Context: NotesContext,
    Provider: NotesProvider,
}
