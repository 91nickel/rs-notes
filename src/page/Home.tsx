import { FunctionComponent } from 'react'
import { Grid } from '@mantine/core'
import { Note } from '@/component/note'

const HomePage: FunctionComponent = () => {
    return (
        <>
            <Grid>
                <Grid.Col span={3}>
                    <Note.List></Note.List>
                </Grid.Col>
                <Grid.Col span={9}>
                    <Note.View></Note.View>
                </Grid.Col>
            </Grid>
        </>
    )
}

export default HomePage