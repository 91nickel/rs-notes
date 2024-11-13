import { FunctionComponent } from 'react'
import { Card, Group, Text } from '@mantine/core'
import { INoteUserFields } from '@/type/note'

export const DEFAULT_NOTE_LIST_ITEM_NAME = 'Название заметки'
export const DEFAULT_NOTE_LIST_ITEM_CONTENT = 'Нет дополнительного текста'

const NotesListItem: FunctionComponent<INoteUserFields> = ({name, content}: INoteUserFields) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" w="100%"  withBorder>
            <Text fw={500} truncate={'end'}>
                {name || DEFAULT_NOTE_LIST_ITEM_NAME}
            </Text>
            <Group justify="space-between" mt="md" mb="xs">
                <Text size="sm" c="dimmed" truncate={'end'}>
                    {content || DEFAULT_NOTE_LIST_ITEM_CONTENT}
                </Text>
            </Group>
        </Card>
    )
}

export default NotesListItem