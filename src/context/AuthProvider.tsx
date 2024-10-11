import React, { createContext, FunctionComponent, useState } from 'react'
import { PagesList } from '@/router/AppRouter'
import { IFormValues as IAuthFormData } from '@/component/auth/SignInForm'

const AuthContext: React.Context<any> = createContext({})

const AuthProvider: FunctionComponent = ({children}: any) => {

    const [user, setUser] = useState(localStorage.getItem('login') || null)

    const value = {
        user,
        signIn: (authFormData: IAuthFormData, callback: Function) => {
            // console.log('signIn()', authFormData)
            setUser(authFormData.login)
            localStorage.setItem('login', authFormData.login)
            callback()
        },
        signOut: (callback: Function) => {
            // console.log('signOut()')
            setUser(null)
            localStorage.removeItem('login')
            callback()
        },
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default {
    Context: AuthContext,
    Provider: AuthProvider,
}
