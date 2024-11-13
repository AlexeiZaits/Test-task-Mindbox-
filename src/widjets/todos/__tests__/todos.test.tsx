import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoListReducer, { ITodos } from '../../../features/TodoList/model/todo-list-slice';
import Todos from '../ui/Todos'; // Компонент с UI для задач

interface RootState {
  todoList: ITodos;
}

const createMockStore = (initialState: RootState) => {
  return configureStore({
    reducer: {
      todoList: todoListReducer,
    },
    preloadedState: initialState,
  });
};

describe('Todos', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    const initialState: RootState = {
      todoList: {
        todos: [],
        filter: 'All',
        view: true,
      },
    };
    store = createMockStore(initialState);
  });

  it('должен добавлять задачу через CustomInput', async () => {
    render(
      <Provider store={store}>
        <Todos />
    </Provider>
    );
    
    // Находим элемент ввода задачи и кнопку
    const inputElement = screen.getByPlaceholderText('What needs to be done?');
    
    // Вводим текст задачи
    fireEvent.change(inputElement, { target: { value: 'Новая задача' } });
    
    // Нажимаем клавишу Enter
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    // Проверяем, что задача добавлена в список
    await waitFor(() => {
      expect(screen.queryByTestId('Новая задача')).toBeInTheDocument();
    });
  });

  it('должен переключать состояние задачи на завершенную через CheckBox', () => {
    // Начальное состояние с одной задачей
    const modifiedState = {
      todoList: {
        todos: [{ id: '1', text: 'Тестовая задача', completed: false }],
        filter: 'All',
        view: true,
      },
    };
    store = createMockStore(modifiedState);

    render(
      <Provider store={store}>
        <Todos />
      </Provider>
    );

    // Находим задачу и переключаем её состояние
    const taskCheckbox = screen.getByRole('checkbox');
    expect(taskCheckbox).not.toBeChecked();
    fireEvent.click(taskCheckbox);
    expect(taskCheckbox).toBeChecked();
  });

  it('должен удалять задачу через Button', async () => {
    // Начальное состояние с одной задачей
    const modifiedState = {
      todoList: {
        todos: [{ id: '1', text: 'Удалить меня', completed: false }],
        filter: 'All',
        view: true,
      },
    };
    store = createMockStore(modifiedState);

    render(
      <Provider store={store}>
        <Todos/>
      </Provider>
    );

    // Находим кнопку удаления задачи
    const deleteButton = screen.getByTestId('delete-todo-1');
    fireEvent.click(deleteButton);

    // Проверяем, что задачи больше нет в списке
    await waitFor(() => {
      expect(screen.queryByTestId('Удалить меня')).not.toBeInTheDocument();
    });
  });

  it('должен отфильтровать задачи на Active и Compeleted через Control', async () => {
    const modifiedState = {
      todoList: {
        todos: [
          { id: '1', text: 'Active', completed: false },
          { id: '2', text: 'Completed', completed: true }
        ],
        filter: 'All',
        view: true,
      },
    };
    store = createMockStore(modifiedState);

    render(
      <Provider store={store}>
        <Todos/>
      </Provider>
    );

    // Находим кнопки active/completed
    const activeButton = screen.getByTestId('todoActive');
    const completedButton = screen.getByTestId('todoCompleted');
    
    fireEvent.click(activeButton);

    // Проверяем, что остались только выполненные задачи
    await waitFor(() => {
      expect(screen.queryByTestId('Completed')).toBeInTheDocument();
    });

    fireEvent.click(completedButton);
    // Проверяем, что остались только активные задачи
    await waitFor(() => {
      expect(screen.queryByTestId('Active')).toBeInTheDocument();
    });
  });

  it('должен удалить все выполненные задачи через Control', async () => {
    const modifiedState = {
      todoList: {
        todos: [
          { id: '1', text: 'Active', completed: false },
          { id: '2', text: 'Completed', completed: true }
        ],
        filter: 'All',
        view: true,
      },
    };
    store = createMockStore(modifiedState);

    render(
      <Provider store={store}>
        <Todos/>
      </Provider>
    );

    // Находим кнопку удаления выполненных задач
    const deleteCompletedButton = screen.getByTestId('todoDeleteCompleted');
    
    fireEvent.click(deleteCompletedButton);
    
    // Проверяем, что не осталось выполненных задач
    await waitFor(() => {
      expect(screen.queryByTestId('Completed')).not.toBeInTheDocument();
    });

  });
});