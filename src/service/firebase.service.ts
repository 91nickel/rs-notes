import { initializeApp, FirebaseOptions } from 'firebase/app'
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    setPersistence,
    browserLocalPersistence,
    User,
    NextOrObserver,
    Auth,
} from 'firebase/auth'
import {
    getDatabase, ref,
    onValue,
    set,
    Database,
    get,
    child,
} from 'firebase/database'
import { FirebaseApp } from 'firebase/app'

interface IFirebaseService {
    readonly app: FirebaseApp
    readonly db: Database
    connected: boolean
    checkConnectionCount: number
    notes: string
    getAuth(): Auth
    getUid(): string | undefined
    signIn(email: string, password: string): Promise<void | User>
    signOut(): Promise<void>
    onAuthStateChanged(cb: NextOrObserver<User | null>): void
    onConnectionStateChanged(cb: (val: boolean) => void): void
    onNotesChanged(cb: (listJsonString: string) => void): void
    saveNotes(data: string): Promise<void>
}

export enum FIREBASE_SERVICE_ERRORS {
    DISCONNECTED = 'DISCONNECTED',
    UNAUTHORIZED = 'UNAUTHORIZED',
}

const firebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyCO7tUbV2TuOYTm7yJDzs6Y4yBD6FNHqvw',
    authDomain: 'rs-notes-7bbb5.firebaseapp.com',
    projectId: 'rs-notes-7bbb5',
    storageBucket: 'rs-notes-7bbb5.firebasestorage.app',
    messagingSenderId: '525121680264',
    appId: '1:525121680264:web:387033aa2c3503328ac03d',
    databaseURL: 'https://rs-notes-7bbb5-default-rtdb.europe-west1.firebasedatabase.app/',
}

const NOTES_PATH = 'notes'

class FirebaseService implements IFirebaseService {

    app: FirebaseApp
    db: Database
    connected: boolean = false
    checkConnectionCount: number = 0
    notes: string = ''

    constructor() {
        this.app = initializeApp(firebaseConfig)
        this.db = getDatabase(this.app)
    }

    getAuth(): Auth {
        return getAuth()
    }

    getUid(): string | undefined {
        return this.getAuth().currentUser?.uid
    }

    signIn(email: string, password: string): Promise<void | User> {
        return setPersistence(getAuth(), browserLocalPersistence)
            .then(() => {
                return signInWithEmailAndPassword(getAuth(), email, password)
                    .then((userCredential) => {
                        // Signed in
                        console.log(userCredential)
                        return userCredential.user
                    })
                    .catch((error) => {
                        console.log(error.code)
                        if (error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credential') {
                            throw new Error('Неверный E-mail или пароль')
                        } else {
                            throw new Error('Неизвестная ошибка')
                        }
                    })
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorMessage, errorCode)
            })
    }

    signOut(): Promise<void> {
        return signOut(getAuth()).then(() => {
            // Sign-out successful.
            console.log('Signed out')
        }).catch((error) => {
            console.log(error)
            // An error happened.
        })
    }

    onAuthStateChanged(cb: NextOrObserver<User | null>): void {
        onAuthStateChanged(getAuth(), cb)
    }

    onConnectionStateChanged(cb: (val: boolean) => void): void {
        onValue(ref(this.db, '.info/connected'), (snap) => {
            // console.log('connected:', snap.val())
            this.connected = snap.val()
            this.checkConnectionCount++
            cb(snap.val())
        })
    }

    onNotesChanged(cb: (listJsonString: string) => void): void {
        const uid = this.getUid()
        if (!uid) {
            return
        }
        onValue(ref(this.db, `${NOTES_PATH}/${uid}/`), (snapshot) => {
            if (this.notes !== snapshot.val()) {
                this.notes = snapshot.val()
                cb(snapshot.val())
            }
        })
    }

    saveNotes(data: string): Promise<void> {
        // console.log('FirebaseService.saveNotes()', data)
        const uid = this.getUid()
        if (!uid) {
            return Promise.resolve()
        }
        return set(ref(this.db, `${NOTES_PATH}/${uid}/`), data)
    }

    getNotes(): Promise<string> {
        return new Promise((res, rej) => {
            const uid = this.getUid()
            if (!uid) {
                return rej(FIREBASE_SERVICE_ERRORS.UNAUTHORIZED)
            }

            if (!this.connected) {
                return rej(FIREBASE_SERVICE_ERRORS.DISCONNECTED)
            }

            if (this.notes) {
                return res(this.notes)
            }

            return get(child(ref(this.db), `${NOTES_PATH}/${uid}/`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        // console.log(snapshot.val())
                        res(snapshot.val())
                    } else {
                        // console.log('No data available')
                        res('')
                    }
                })
        })
    }
}

const Service = new FirebaseService()

export { Service as FirebaseService }
