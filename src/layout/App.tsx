import { Outlet } from 'react-router-dom'
import { FunctionComponent } from 'react'
import '@/style/App.scss'
import { Container } from '@mantine/core'

const AppLayout: FunctionComponent = () => {
    return (
        <Container>
            <Outlet/>
        </Container>
    )
}

export default AppLayout