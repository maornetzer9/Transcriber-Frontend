import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

export default function LanguageSelect({ language, setLanguage = () => {} }) {

    const handleLanguageChange = ({ target: { value } }) => setLanguage(value);

    return (
        <FormControl fullWidth>
            <InputLabel> שפה </InputLabel>
            <Select
                labelId="language-select-label"
                sx={{ textAlign: "right", width: "100%" }}
                onChange={handleLanguageChange}
                value={language}
                label="שפה"
            >
                <MenuItem dir="rtl" value="auto">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        זיהוי אוטומטי
                        {language === "auto" && <DoneIcon />}
                    </Box>
                </MenuItem>
                <MenuItem dir="rtl" value="he">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        עברית
                        {language === "he" && <DoneIcon />}
                    </Box>
                </MenuItem>
                <MenuItem dir="rtl" value="en">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        אנגלית
                        {language === "en" && <DoneIcon />}
                    </Box>
                </MenuItem>
                <MenuItem dir="rtl" value="ar">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        ערבית
                        {language === "ar" && <DoneIcon />}
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    );
}
