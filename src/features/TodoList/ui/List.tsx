import { TodoItem } from 'entities/index';
import { useTodoList } from '../hooks/useTodoList';
import { motion, AnimatePresence } from 'framer-motion';
import "./todoList.scss"

export const List = () => {
  const [todos, {handleToggleTask, handleDeleteTask}] = useTodoList()
  
  return (
    <>
      <AnimatePresence>
      {todos.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <TodoItem
            id={task.id}
            text={task.text}
            completed={task.completed}
            toggleTask={() => handleToggleTask(task.id)}
            deleteTask={() => handleDeleteTask(task.id)}
          />
        </motion.div>
      ))}
      </AnimatePresence>
    </>
  );
};
