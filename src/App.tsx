import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { Context } from '@/context'
import { AppRouter } from '@/router/AppRouter.tsx'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@/style/index.scss'
import 'easymde/dist/easymde.min.css'

function App() {
    return (
        <MantineProvider>
            <Notifications/>
            <Context.App.Provider>
                <Context.Auth.Provider>
                        <BrowserRouter>
                            <AppRouter/>
                        </BrowserRouter>
                </Context.Auth.Provider>
            </Context.App.Provider>
        </MantineProvider>
    )
}

export default App
