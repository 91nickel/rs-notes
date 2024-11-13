export interface INoteUserFields {
    name: string
    content: string
}

export interface INoteRaw extends INoteUserFields {
    readonly id: string
    createdAt: string
    updatedAt: string
}

export interface INote extends Omit<INoteRaw, 'createdAt' | 'updatedAt'> {
    createdAt: Date
    updatedAt: Date
}
