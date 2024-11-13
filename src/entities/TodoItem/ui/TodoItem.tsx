import Box from '@mui/material/Box/Box';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { memo } from 'react';
import { ITodoItem } from 'shared/types/todos';

export const TodoItem = memo(({ id, completed, text, toggleTask, deleteTask }: ITodoItem) => {
    
    return (
      <Box
        data-testid={`${text}`}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          textDecoration: completed ? 'line-through' : 'none',
          color: completed ? 'gray' : 'black',
          padding: '0.2rem 0.3rem',
          borderBottom: "1px solid black",
        }}
      >
        {toggleTask && (
          <Checkbox checked={completed} onChange={toggleTask} />
        )}
        <Typography
          sx={{
            cursor: "pointer",
            wordBreak: "break-word",
            whiteSpace: "normal",
            textAlign: "left",
            flexGrow: 1,
          }}
          onClick={toggleTask ? () => toggleTask() : () => {}}
          variant="body2"
        >
          {text}
        </Typography>
        {deleteTask && (
          <IconButton data-testid={`delete-todo-${id}`} onClick={() => deleteTask()} size="small" color="default">
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    );
  }, (prevProps, nextProps) => (
    prevProps.completed === nextProps.completed &&
    prevProps.text === nextProps.text
));