import { Grid, Button, Flex, Modal, Loader } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencil, IconTrash, IconFilePlus } from '@tabler/icons-react'
import { useNotes } from '@/hook/useNotes.tsx'
import { Note } from '@/component/note'
import { Search } from '@/component/search'

const HomePage = () => {

    const [opened, {open, close}] = useDisclosure(false)

    const {
        currentNoteId,
        isLoading,
        isEditing,
        count,
        toEdit,
        handleSearch,
        handleCreateNewNote,
        handleDelete,
    } = useNotes()

    function onDelete() {
        handleDelete()
        close()
    }

    return (
        <>
            <Grid mt={'md'} h={'100%'}>
                <Grid.Col span={3} mih={'100vh'}>
                    <Search.Field disabled={count < 2} onSearch={handleSearch}/>
                    <Note.List></Note.List>
                </Grid.Col>
                <Grid.Col span={9} mih={'100vh'}>
                    <Flex justify={'space-between'} mb={'md'}>
                        <div>
                            <Button
                                variant={'outline'}
                                disabled={isLoading || !currentNoteId}
                                onClick={open}
                            >
                                <IconTrash/>
                            </Button>
                        </div>
                        <Flex justify={'space-between'} align={'center'}>
                            {isLoading && <Loader size={'sm'} color="blue" opacity={'.1'}/>}
                        </Flex>
                        <div>
                            <Button
                                variant={'outline'}
                                disabled={isLoading || isEditing || !currentNoteId}
                                onClick={toEdit}
                            >
                                <IconPencil/>
                            </Button>
                            <Button
                                variant={'outline'}
                                disabled={isLoading}
                                onClick={handleCreateNewNote}
                            >
                                <IconFilePlus/>
                            </Button>
                        </div>
                    </Flex>
                    {currentNoteId && isEditing && <Note.Edit/>}
                    {currentNoteId && !isEditing && <Note.View/>}
                </Grid.Col>
            </Grid>
            <Modal opened={opened} onClose={close} title="Подтвердите удаление">
                <Button
                    variant={'outline'}
                    disabled={isLoading || !currentNoteId}
                    onClick={onDelete}
                >
                    Подтвердить
                </Button>
            </Modal>
        </>
    )
}

export default HomePage
