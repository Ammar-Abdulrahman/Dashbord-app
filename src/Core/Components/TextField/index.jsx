import { useState } from "react";
import { TextField , Typography } from "@mui/material";

    const ValidatedTextField = ({ name , label, type , style ,value, onChange, validation, errorText }) => {
    
    const [error , setError] = useState(false)

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        onChange(inputValue);
    
        if (validation) {
            const isValid = validation(inputValue);
            setError(!isValid);
        }
    }
    
    return (
    <>
        <TextField
        id={`outlined-${name}-input`}
        style={style}
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        error={error}
        fullWidth
        variant="standard"
        helperText={error ? errorText : ''}
        />
        {error && <Typography variant="caption" color="error"></Typography>}
    </>
    );
}

export default ValidatedTextField;