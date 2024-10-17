import React from "react";
import { Box, Button } from "@mui/material";

export default function ButtonModel({ title = "", icon = null, onClick = () => {}, bgColor = '', color = '', load = false }) {
    return (
        <Box component={"div"}>
            <Button
                disabled={load}
                variant="contained"
                
                endIcon={icon}
                fullWidth
                color={color}
                sx={{
                    justifyContent:'space-between',
                    textTransform: "none",
                    background: "transparent",
                    bgcolor: bgColor
                }}
                onClick={onClick}
            >
                {title}
            </Button>
        </Box>
    );
}
