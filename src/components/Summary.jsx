import React, { useEffect } from 'react';
import { formatTranscription } from '../utils/actionButton';
import { Box, Typography, Dialog, DialogContent, DialogTitle } from '@mui/material';
import '../css/summary.css';

export default function Summary({ summary, transcription, wordsPerLine, isSummarizing, setIsSummarizing }) {
    const formattedSummary = formatTranscription(transcription, wordsPerLine);
    
    useEffect(() => {
        if (summary) 
        {
            setIsSummarizing(true);
        }
    }, [summary]);

    return (
        <Box component={'div'} className='summary_container'>
            <Typography variant='h4'>
                סיכום שיחה:
            </Typography>

            {/* Formatted Transcription */}
            <pre>{formattedSummary}</pre>

            {/* Dialog for the summary */}
            <Dialog 
                fullWidth 
                maxWidth="sm" 
                dir='rtl'
                aria-hidden={false}
                open={summary ? isSummarizing : false} 
                onClose={() => setIsSummarizing(false)} 
            >
                <DialogTitle> סיכום שיחה </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">{summary}</Typography>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
