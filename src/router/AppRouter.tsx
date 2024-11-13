import { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Page } from '@/page'
import { Layout } from '@/layout'
import { PrivateRoute } from '@/component/hoc/PrivateRoute'
import { Context } from '@/context'

// import { EntityType } from '@/type/list'

export const AppRouter: FunctionComponent = () => {
    return (
    <Routes>
            <Route element={<Layout.App/>}>
                <Route element={<PrivateRoute/>}>
                    <Route element={<Context.Notes.Provider><Layout.Home/></Context.Notes.Provider>}>
                        <Route index element={<Page.Home/>}/>
                    </Route>
                    <Route path="*" element={<Page.NotFound/>}/>
                </Route>
                <Route path={PagesList.signIn} element={<Page.SignIn/>}/>
            </Route>
        </Routes>
    )
}

export enum PagesList {
    signIn = 'signIn',
}
