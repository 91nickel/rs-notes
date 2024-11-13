import { FunctionComponent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Center } from '@mantine/core'

import { useAuth } from '@/hook/useAuth'
import ErrorBoundary from '@/component/hoc/ErrorBoundary'
import SignInForm, { IFormValues } from '@/component/auth/SignInForm'

const SignInPage: FunctionComponent = () => {
    const {signIn, error} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    function handleSubmit(authData: IFormValues) {
        signIn(authData, () => {
            navigate(location.state?.from || '/', {replace: true})
        })
    }

    return (
        <Container>
            <Center>
                <h1>Авторизация</h1>
            </Center>
            <Center>
                <ErrorBoundary>
                    <SignInForm error={error} onSubmit={handleSubmit}/>
                </ErrorBoundary>
            </Center>
        </Container>
    )
}

export default SignInPage
