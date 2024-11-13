import IconButton from "@mui/material/IconButton/IconButton";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import TextField from "@mui/material/TextField/TextField"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";

interface ICustomInput {
  handleValue: (value: string) => void
  handleToggle: () => void
}

export const CustomInput = ({handleValue, handleToggle}: ICustomInput) => {
    const [inputValue, setInputValue] = useState('');
    const [isListOpen, setIsListOpen] = useState(false);
    
    const addValue = () => {
        if (inputValue.trim()) {
          handleValue(inputValue)
          setInputValue('');
        }
    };

    const handleClick = () => {
        handleToggle();
        setIsListOpen(!isListOpen)
    }

    return <TextField
    fullWidth
    placeholder="What needs to be done?"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && addValue()}
    variant="standard"
    sx={{
      fontStyle: "italic",
      height: '4rem',
      '& .MuiInputBase-root': { 
        height: '100%',
        alignItems: 'center',
        paddingRight: "0.5rem"
      },
    }}
    size="small"
    InputProps={{
      startAdornment: (
        <>
        {true && <InputAdornment sx={{ marginRight: '1rem', marginLeft: "0.5rem"}} position="start">
          <IconButton onClick={handleClick} size="small">
            {isListOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </InputAdornment>}
        </>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            size="small"
            onClick={() => setInputValue('')} // Очищает текстовое поле
            edge="end"
            sx={{ visibility: inputValue ? 'visible' : 'hidden' }} // Показать крестик только если есть текст
          >
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
}