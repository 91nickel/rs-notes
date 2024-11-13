import { INoteRaw, INote } from '@/type/note'
import { FirebaseService } from '@/service/firebase.service'
// import * as _ from 'lodash'

const NOTES_LOCAL_STORAGE_KEY = 'notes'

interface INoteService {
    cachedList: string
    toRaw: (note: INote) => INoteRaw
    fromRaw: (note: INoteRaw) => INote
    save: (data: INote[]) => Promise<void> | void
    // load: () => Promise<INote[]>
    onDBChanged: (cb: (list: INote[]) => void) => void
}

class NoteService implements INoteService {

    cachedList: string = ''

    toRaw(note: INote): INoteRaw {
        return {
            ...note,
            createdAt: note.createdAt.toISOString(),
            updatedAt: note.updatedAt.toISOString(),
        }
    }

    fromRaw(noteRaw: INoteRaw): INote {
        return {
            ...noteRaw,
            createdAt: new Date(noteRaw.createdAt),
            updatedAt: new Date(noteRaw.updatedAt),
        }
    }

    save(data: INote[]): Promise<void> | void {
        try {
            const rawList: INoteRaw[] = data.map(this.toRaw)
            const listJsonString = JSON.stringify(rawList)

            if (listJsonString === this.cachedList) {
                // console.log('already saved')
                return
            }

            return this.saveToLocalStorage(listJsonString)
                .then(() => this.saveToDB(listJsonString))
        } catch (e) {
            console.error('save(): Something went wrong on save', data)
        }
    }

    saveToDB(listJsonString: string): Promise<void> {
        return FirebaseService.saveNotes(listJsonString)
    }

    onDBChanged(cb: (list: INote[]) => void): void {
        FirebaseService.onNotesChanged((listJsonString: string) => {
            // console.log('onDBChanged', listJsonString)
            try {
                if (!listJsonString)
                    listJsonString = '[]'
                const rawList: INoteRaw[] = JSON.parse(listJsonString)
                cb(rawList.map(this.fromRaw))
            } catch (e: any) {
                console.error('load(): Something went wrong on load', e.message)
            }
        })
    }

    saveToLocalStorage(listJsonString: string): Promise<void> {
        return new Promise((res) => {
            if (listJsonString !== localStorage.getItem(NOTES_LOCAL_STORAGE_KEY)) {
                localStorage.setItem(NOTES_LOCAL_STORAGE_KEY, listJsonString)
            }
            res()
        })
    }

    load(): Promise<INote[]> {
        // let error: FIREBASE_SERVICE_ERRORS

        return Promise.all([
            this.loadFromLocalStorage(),
            // this.loadFromDB(),
        ]).then(([lsData]): INote[] => {
            const listJsonString = this.cachedList = lsData

            // if (lsData !== dbData) {
            //     console.log('Conflict!!!', lsData, dbData)
            //     this.saveToDB(listJsonString)
            // }

            try {
                const rawList: INoteRaw[] = JSON.parse(listJsonString)
                return rawList.map(this.fromRaw)
            } catch (e: any) {
                console.error('load(): Something went wrong on load', e.message)
                return []
            }
        })
    }

    loadFromDB(): Promise<string> {
        return FirebaseService.getNotes()
            .then(listJsonString => listJsonString || '[]')
    }

    loadFromLocalStorage(): Promise<string> {
        return new Promise((res) => {
            return res(localStorage.getItem(NOTES_LOCAL_STORAGE_KEY) || '[]')
        })
    }

}

const Service = new NoteService()

export { Service as NoteService }
