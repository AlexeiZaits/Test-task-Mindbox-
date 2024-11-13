import { useAppDispatch, useAppSelector } from "app/store/store"
import { addTask, changeFilter, clearCompletedTasks, deleteTask, ITodos, TodoId, toggleTask, toggleView } from "../model/todo-list-slice"
import { selectFilteredTodos } from "../model/todo-list-selectors"
import { ITodoItem } from "shared/types/todos"

interface IHandlersTodos{
    handleAddTask: (textTask: string) => void,
    handleToggleTask: (id: TodoId) => void,
    handleDeleteTask: (id: TodoId) => void,
    handleChangeFilter: (filter: Pick<ITodos, "filter">) => void,
    handleClearCompeletedTasks: () => void,
    handleToggleViewTodos: () => void,
}

export const useTodoList = (): [
    ITodoItem[],
    IHandlersTodos
] => {
    const dispatch = useAppDispatch()
    const todos = useAppSelector(selectFilteredTodos)
    
    const handleAddTask = (textTask: string) => dispatch(addTask(textTask))
    const handleToggleTask = (id: TodoId) => dispatch(toggleTask(id))
    const handleDeleteTask = (id:TodoId) => dispatch(deleteTask(id))
    const handleChangeFilter = (filter: Pick<ITodos, "filter">) => dispatch(changeFilter(filter))
    const handleClearCompeletedTasks = () => dispatch(clearCompletedTasks())
    const handleToggleViewTodos = () => dispatch(toggleView())
    
    return [todos, {
        handleAddTask: handleAddTask,
        handleToggleTask: handleToggleTask,
        handleDeleteTask: handleDeleteTask,
        handleChangeFilter: handleChangeFilter,
        handleClearCompeletedTasks:handleClearCompeletedTasks,
        handleToggleViewTodos: handleToggleViewTodos,
    }]
}