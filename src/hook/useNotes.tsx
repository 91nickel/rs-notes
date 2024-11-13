import { useContext } from 'react'
import { Context } from '@/context'

export function useNotes() {
    return useContext(Context.Notes.Context)
}
