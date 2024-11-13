import Box from "@mui/material/Box/Box"
import Skeleton from "@mui/material/Skeleton/Skeleton"
import Typography from "@mui/material/Typography/Typography"
import { CustomInput } from "features/CustomInput/ui/CustomInput"
import { TodoList } from "features/index"
import { useTodoList } from "features/TodoList/hooks/useTodoList"

interface ITodos {
    skeleton?: boolean
}

const Todos = ({skeleton}:ITodos) => {
    const [, {handleAddTask, handleToggleViewTodos}] = useTodoList()
    
    return <Box sx={{ maxWidth: 600, margin: 'auto', textAlign: 'center', padding: 2 }}>
        <Typography variant="h3" sx={{ color: 'rgb(209, 123, 138)', mb: 2, fontSize: '3rem', opacity: 0.8 }}>
            {skeleton ? <Skeleton width="100%" /> : "todos"}
        </Typography>
        <Box sx={{ border: '1px solid #ccc', borderRadius: '5px', backgroundColor: "white" }}>
            {skeleton ?
                <Skeleton variant="rectangular" width="100%" height={50} sx={{ mb: 2 }} /> :
                <CustomInput handleToggle={handleToggleViewTodos} handleValue={handleAddTask}/>
            }
            {skeleton ?
                <Skeleton variant="rectangular" width="100%" height={200} /> :
                <TodoList/>
            }
        </Box>
    </Box>
}

export default Todos
