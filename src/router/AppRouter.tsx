import { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Page } from '@/page'
import { Layout } from '@/layout'
import { PrivateRoute } from '@/component/hoc/PrivateRoute'

// import { EntityType } from '@/type/list'

export const AppRouter: FunctionComponent = () => {
    return (
        <Routes>
            <Route element={<Layout.App/>}>
                <Route element={<PrivateRoute/>}>
                    <Route element={<Layout.Home/>}>
                        <Route index element={<Page.Home/>}/>
                    </Route>
                    {/*<Route path="characters" element={<Layout.List h1="Characters"/>}>*/}
                    {/*    /!*<Route index element={<Page.List type={EntityType.character}/>}/>*!/*/}
                    {/*    /!*<Route path=":id" element={<Page.Item type={EntityType.character}/>}/>*!/*/}
                    {/*</Route>*/}
                    {/*<Route path="locations" element={<Layout.List h1="Locations"/>}>*/}
                    {/*    /!*<Route index element={<Page.List type={EntityType.location}/>}/>*!/*/}
                    {/*    /!*<Route path=":id" element={<Page.Item type={EntityType.location}/>}/>*!/*/}
                    {/*</Route>*/}
                    {/*<Route path="episodes" element={<Layout.List h1="Episodes"/>}>*/}
                    {/*    /!*<Route index element={<Page.List type={EntityType.episode}/>}/>*!/*/}
                    {/*    /!*<Route path=":id" element={<Page.Item type={EntityType.episode}/>}/>*!/*/}
                    {/*</Route>*/}
                    <Route path="*" element={<Page.NotFound/>}/>
                </Route>
                <Route path="signin" element={<Page.SignIn/>}/>
            </Route>
        </Routes>
    )
}

export enum PagesList {
    signIn = 'signIn',
}
