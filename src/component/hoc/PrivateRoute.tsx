import { FunctionComponent } from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '@/hook/useAuth'
import { PagesList } from '@/router/AppRouter.tsx'

export const PrivateRoute: FunctionComponent = () => {
    const auth = useAuth()
    const location = useLocation()

    if (auth.user === null) {
        return <Navigate to={PagesList.signIn} state={{from: location.pathname}} replace/>
    }
    return <Outlet/>
}
