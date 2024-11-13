import { Box, Typography, Stack, Button } from '@mui/material';
import { useAppSelector } from "app/store/store"
import { useTodoList } from "../hooks/useTodoList"
import { selectFilterTodos, selectQtyActiveTodos } from "../model/todo-list-selectors"
import { filterKeys } from "../model/todo-list-slice"

const fontSizeText = "0.65rem";

export const TodoControl = () => {

    const tasksQty = useAppSelector(selectQtyActiveTodos)
    const filter = useAppSelector(selectFilterTodos)
    const [, {handleChangeFilter, handleClearCompeletedTasks}] = useTodoList();
    
    return <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    sx={{ mt: 1, padding: '0.5rem 1.4rem' }}
  > 
    <Typography sx={{color: "grey", fontSize: fontSizeText, cursor: "pointer"}} variant="body2">
      {tasksQty} item(s) left
    </Typography>
    <Stack direction="row" spacing={1}>
      {filterKeys.map((status) => (
        <Button
          data-testid={`todo${status}`}
          sx={{ fontSize: fontSizeText }}
          key={status}
          variant={filter === status ? 'contained' : 'text'}
          onClick={() => handleChangeFilter({filter: status})}
        >
          {status}
        </Button>
      ))}
    </Stack>
    <Button data-testid={`todoDeleteCompleted`} sx={{ fontSize: fontSizeText }} color="secondary" onClick={handleClearCompeletedTasks}>
      Clear completed
    </Button>
  </Box>
}