import React, { createContext, FunctionComponent, useState } from 'react'

const AppContext: React.Context<any> = createContext({})

const AppProvider: FunctionComponent = ({children}) => {
    const value = {}
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default {
    Context: AppContext,
    Provider: AppProvider,
}
