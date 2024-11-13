import React, { createContext, FunctionComponent } from 'react'
import { LayoutProps } from '@/type/layout.ts'

const AppContext: React.Context<any> = createContext({})

const AppProvider: FunctionComponent<LayoutProps> = ({children}) => {
    const value = {}
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default {
    Context: AppContext,
    Provider: AppProvider,
}
