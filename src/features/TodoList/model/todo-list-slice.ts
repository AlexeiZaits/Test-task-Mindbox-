import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ITodoItem } from "shared/types/todos";

export const filterKeys = ["All", "Active", "Completed"];
export type TFilterKey = typeof filterKeys[number];

export type TodoId = number | string

export interface ITodos {
    todos: ITodoItem[],
    filter: TFilterKey,
    view: boolean
}

const initialState: ITodos = {
    todos: [],
    filter: "All",
    view: false,
}

export const todoListSlice = createSlice({
    name: "@todoListSlice",
    initialState: initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            state.todos.push({ text: action.payload, completed: false, id: nanoid() });
        },
        toggleTask: (state, action: PayloadAction<TodoId>) => {
            const task = state.todos.find((item) => item.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        deleteTask: (state, action: PayloadAction<TodoId>) => {
            state.todos = state.todos.filter(task => task.id !== action.payload);
        },
        clearCompletedTasks: (state, ) => {
            state.todos = state.todos.filter((task) => !task.completed);
        },
        changeFilter: (state, action: PayloadAction<Pick<ITodos, "filter">>) => {
            state.filter = action.payload.filter
        },
        toggleView: (state, ) => {
            state.view = !state.view
        }
    }
})

export const {addTask, toggleTask, deleteTask, clearCompletedTasks, changeFilter, toggleView} = todoListSlice.actions
export default todoListSlice.reducer;