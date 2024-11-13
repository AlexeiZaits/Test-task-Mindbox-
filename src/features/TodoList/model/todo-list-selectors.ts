import { createSelector } from "@reduxjs/toolkit/react"
import { RootState } from "app/store/store"

export const selectAllTodos = (state:RootState) => state.todoList.todos
export const selectFilterTodos = (state: RootState) => state.todoList.filter
export const selectViewTodos = (state: RootState) => state.todoList.view
export const selectQtyActiveTodos = (state:RootState) => state.todoList.todos.filter((task) => !task.completed === true).length
export const selectFilteredTodos = createSelector([selectAllTodos, selectFilterTodos], (todos, filter) => {
    return todos.filter((task) => {
        if (filter === 'Active') return !task.completed;
        if (filter === 'Completed') return task.completed;
        return true;
    });
})