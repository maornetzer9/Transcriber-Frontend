import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key'; // Import the key icon or any other icon

export default function InputModel({
    label = "",
    variant = "outlined",
    type = '',
    value = '',
    icon = '', 
    onChange = () => {},
    readOnly = false, 
    ...props
}) {
    return (
        <TextField
            dir="rtl"
            type={type}
            label={label}
            defaultValue={value}
            variant={variant}
            onChange={onChange}
            {...props}
            InputProps={{
                readOnly: readOnly,
                startAdornment: (
                    <InputAdornment position="start">
                        {icon }
                    </InputAdornment>
                ),
            }}
            slotProps={{
                inputLabel: {
                    style: {
                        // fontWeight: 'bold',
                        // textAlign: 'right',
                        // right: 20,
                        // top: -5,
                        // transformOrigin: 'top right',
                    },
                },
            }}
        />
    );
}
