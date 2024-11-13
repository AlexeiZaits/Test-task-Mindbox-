export interface ITodosWidjet {
    skeleton?: boolean
}

export interface ITodoItem {
    id: number|string,
    completed: boolean,
    text: string,
    toggleTask?: () => void,
    deleteTask?: () => void,
}

export type TodoId = number | string