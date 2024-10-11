import { ReactNode, useState } from 'react'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { BrowserRouter } from 'react-router-dom'
import { Context } from '@/context'
import { AppRouter } from '@/router/AppRouter.tsx'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';
import '@/style/index.scss'

function App() {
    return (
        <MantineProvider>
            <Notifications/>
            <BrowserRouter>
                <Context.Auth.Provider>
                    <AppRouter/>
                </Context.Auth.Provider>
            </BrowserRouter>
        </MantineProvider>
    )
}

export default App
