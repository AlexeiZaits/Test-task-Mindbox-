import { selectViewTodos } from "../model/todo-list-selectors"
import { TodoControl } from "../ui/Control"
import { List } from "../ui/List"
import { useAppSelector } from "app/store/store"

export const TodoList = () => {
    const view = useAppSelector(selectViewTodos)

    return <>
        {view && <>
        <List/>
        <TodoControl/>
        </>}
    </>
}