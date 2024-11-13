import React, { createContext, FunctionComponent, useEffect, useState } from 'react'
import { IFormValues as IAuthFormData } from '@/component/auth/SignInForm'
import { FirebaseService } from '@/service/firebase.service'
import { User } from 'firebase/auth'
import { LoadingOverlay } from '@mantine/core'
import { LayoutProps } from '@/type/layout.ts'

interface IAuthContext {
    user: any
    error: string,
    signIn: (authFormData: IAuthFormData, callback: () => void) => void
    signOut: (callback: () => void) => void
}

const AuthContext: React.Context<IAuthContext> = createContext({} as IAuthContext)

const AuthProvider: FunctionComponent<LayoutProps> = ({children}) => {

    const [initiated, setInitiated] = useState(false)
    const [user, setUser] = useState(null as User | null)
    const [error, setError] = useState('')

    useEffect(() => {
        const auth = FirebaseService.getAuth()
        FirebaseService.onConnectionStateChanged(value => {
            console.log('Connection state: ', value)
        })

        FirebaseService.onAuthStateChanged(user => {
            console.log('onAuthStateChanged', user)
            setInitiated(true)
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                // console.log(auth.currentUser)
                setUser(auth.currentUser)
            } else {
                // console.log('User is signed out')
                setUser(null)
            }
        })
    }, [])


    const value = {
        user,
        error,
        signIn: (authFormData: IAuthFormData, callback: () => void) => {
            // console.log('signIn()', authFormData)
            setError('')
            FirebaseService.signIn(authFormData.login, authFormData.password)
                .then((data) => {
                    console.log('Success', data)
                    // setUser(authFormData.login)
                    // localStorage.setItem('login', authFormData.login)
                    callback()
                })
                .catch((error) => {
                    console.log(error.code, error.message)
                    setError(error.message)
                })
        },
        signOut: (callback: () => void) => {
            // console.log('signOut()')
            setError('')
            // setUser(null)
            // localStorage.removeItem('login')
            callback()
        },
    }

    if (!initiated) {
        return <LoadingOverlay
            visible={true}
            zIndex={1000}
            overlayProps={{radius: 'sm', blur: 2}}
        />
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default {
    Context: AuthContext,
    Provider: AuthProvider,
}
