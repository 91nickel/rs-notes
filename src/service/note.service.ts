import { INoteRaw, INote } from '@/type/note'
import { FirebaseService } from '@/service/firebase.service'
// import * as _ from 'lodash'

const NOTES_LOCAL_STORAGE_KEY = 'notes'

interface INoteService {
    cachedList: string

    toRaw(note: INote): INoteRaw

    fromRaw(note: INoteRaw): INote

    listFromJson(listJsonString: string): INote[]

    save(data: INote[]): Promise<void> | void

    // load(): Promise<INote[]>

    onDBChanged(cb: (list: INote[]) => void): void
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

    listFromJson(listJsonString: string): INote[] {
        try {
            const rawList: INoteRaw[] = JSON.parse(listJsonString)
            return rawList.map(this.fromRaw)
        } catch (e: any) {
            console.error('load(): Something went wrong on load', e.message)
            return [] as INote[]
        }
    }

    save(data: INote[]): Promise<void> {
        try {
            const rawList: INoteRaw[] = data.map(this.toRaw)
            const listJsonString = JSON.stringify(rawList)

            if (listJsonString === this.cachedList) {
                // console.log('already saved')
                return Promise.resolve()
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

    // load(): Promise<INote[]> {
    //     // let error: FIREBASE_SERVICE_ERRORS
    //
    //     return Promise.all([
    //         this.loadFromLocalStorage(),
    //         // this.loadFromDB(),
    //     ]).then(([lsData]): INote[] => {
    //         const listJsonString = this.cachedList = lsData
    //
    //         // if (lsData !== dbData) {
    //         //     console.log('Conflict!!!', lsData, dbData)
    //         //     this.saveToDB(listJsonString)
    //         // }
    //
    //         try {
    //             const rawList: INoteRaw[] = JSON.parse(listJsonString)
    //             return rawList.map(this.fromRaw)
    //         } catch (e: any) {
    //             console.error('load(): Something went wrong on load', e.message)
    //             return []
    //         }
    //     })
    // }

    loadFromDB(): Promise<INote[]> {
        return FirebaseService.getNotes()
            .then(dbData => {
                this.cachedList = dbData || '[]'
                return this.listFromJson(this.cachedList)
            })
    }

    loadFromLocalStorage(): Promise<INote[]> {
        this.cachedList = localStorage.getItem(NOTES_LOCAL_STORAGE_KEY) || '[]'
        return Promise.resolve(this.listFromJson(this.cachedList))
    }


}

const Service = new NoteService()

export { Service as NoteService }
