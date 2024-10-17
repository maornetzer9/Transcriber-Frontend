import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import DoneIcon from '@mui/icons-material/Done';

export default function ChooseTranscription( { outputFormat, setOutputFormat } ) {

    const selectFormatHandler = (format) => setOutputFormat(format); 

    return (
        <Box component={"div"} textAlign={"center"} >
            {/* Button for Regular Text */}
            <Button
                sx={{ gap: "8px" }}
                onClick={() => selectFormatHandler("plain")}
                endIcon={
                    outputFormat === "plain" && (
                        <DoneIcon
                          sx={{ 
                            borderRadius: "20px", 
                            border: "1px solid gray", 
                            fontSize: '16px !important',
                            padding: 0.2,
                        }} />
                    )
                }
            >
                טקסט רגיל
            </Button>

            {/* Button for SRT Format */}
            <Button
                sx={{ gap: "8px" }}
                onClick={() => selectFormatHandler("srt")}
                endIcon={
                    outputFormat === "srt" && (
                        <DoneIcon
                          sx={{ 
                            borderRadius: "20px", 
                            border: "1px solid gray", 
                            fontSize: '16px !important',
                            padding: 0.2
                        }} />
                    )
                }
            >
                SRT
            </Button>
        </Box>
    );
}
