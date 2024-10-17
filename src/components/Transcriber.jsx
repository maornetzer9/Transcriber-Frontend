import React, { useEffect, useState } from "react";
import KeyIcon from '@mui/icons-material/Key';
import SendIcon from '@mui/icons-material/Send';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Typography } from "@mui/material";
import { summarizeService, transcribeService } from "../services/transcriber";
import InputModel from "./UI/InputModel";
import LanguageSelect from "./LanguageSelect";
import ActionButtons from "./ActionButtons";
import ChooseTranscription from "./ChooseTranscription";
import ButtonModel from "./UI/ButtonModel";
import Summary from "./Summary";
import '../css/transcriber.css';
import '../css/animation.css';

export default function Transcriber() {

    const MODEL = 'whisper-large-v3-turbo';
    const [ summary, setSummary ] = useState('');
    const [ isTranscribing, setIsTranscribing ] = useState(false);
    const [ outputFormat, setOutputFormat ] = useState('plain');
    const [ language, setLanguage ] = useState('auto');
    const [ apiKey, setApiKey ] = useState('');
    const [ audioUrl, setAudioUrl ] = useState(null);
    const [ file, setFile ] = useState(null);
    const [ wordsPerLine, setWordsPerLine ] = useState(2);
    const [ isSummarizing, setIsSummarizing ] = useState(false);
    const [ transcription, setTranscription ] = useState('')
    const [ isCopied, setIsCopied ] = useState(false);
  
    const apiKeyHandler = ({ target: { value } }) => setApiKey( value ); 
    const fileHandler = ( { target: { files } } ) => setFile(files[0])

    const handleWordsPerLineChange = ({ target: { value } }) => setWordsPerLine(Number(value)); 
    
    const handleTranscribe = async () => {
        
        if (!apiKey) return alert('אנא הזן את ה-API Key שלך');
        if (!file) return alert('אנא בחר קובץ אודיו');
      
        const url = URL.createObjectURL(file);
        setAudioUrl(url);
        setIsTranscribing(true);
      
        try 
        {
          const response = await transcribeService(file, apiKey, language, MODEL, outputFormat);
          setTranscription(response)
        } 
        catch(error) 
        {
          alert('אירעה שגיאה בתמלול הקובץ');
          console.error(error.message); 
        } 
        finally 
        {
          setIsTranscribing(false);
        }
      };

    const handleSummarize = async () => {
        if (!transcription) return alert('אין תמלול לסיכום');
    
        setIsSummarizing(true);
        try 
        {
          const response = await summarizeService(transcription, apiKey);
          setSummary(response);
        } 
        catch (error) 
        {
          alert('שגיאה בסיכום');
          console.error(error.message);
        } 
        finally 
        {
          setIsSummarizing(false);
        }
      };

      useEffect(() => {
        return () => {
          if (audioUrl) 
          {
            URL.revokeObjectURL(audioUrl);
          }
        };
      }, [audioUrl]);
    
    return (
        <Box component={"div"} className="subscribe_form_wrapper" dir="rtl">
            <Box component={"form"} className="subscribe_form">
            <Typography 
                textAlign={'center'}
                color="primary"
                variant="h3"
                margin={2}
            >
                {'המתמלל - קבצי אודיו'}
            </Typography>

                {/* API Key Input */}
                <InputModel 
                    type="text" 
                    label={"הגדר API KEY"} 
                    onChange={apiKeyHandler}
                    icon={<KeyIcon />}
                />

                <ButtonModel 
                    title="יצירת Token" 
                    bgColor="green" 
                    color="info"  
                    icon={<SendIcon  />}  
                />

                {/* Audio File Upload */}
                <InputModel type="file" onChange={fileHandler} label="בחר קובץ אודיו"/>

                {/* Language Select */}
                <LanguageSelect setLanguage={setLanguage} language={language}/>

                {/* Model Input Read Only */}
                <InputModel type="text" label="מודל" value={MODEL} readOnly={true}/>

                {/* Words per Line Input */}
                <InputModel type="number" label="מילים בכל שורה" value={wordsPerLine} onChange={handleWordsPerLineChange} />
                
                <ChooseTranscription outputFormat={outputFormat} setOutputFormat={setOutputFormat}/>

                 <ButtonModel 
                    color="info" 
                    bgColor="#6495ED" 
                    title="התחל תמלול"
                    load={isTranscribing ? isTranscribing : false}
                    onClick={handleTranscribe} 
                    icon={ !isTranscribing ?  <PlayCircleOutlineIcon /> : <SettingsOutlinedIcon className="rotate_icon"/>}  
                />

                {/* Audio File Sound */}
                { audioUrl ? 
                  <audio controls style={{width:'100%'}}>
                    <source src={audioUrl} type={file?.type} />
                    Your browser does not support the audio element.
                  </audio>
                : null }

                {/* Summary of the audio  */}
                {transcription ? 
                    <Summary
                        summary={summary}
                        transcription={transcription} 
                        wordsPerLine={wordsPerLine}
                        isSummarizing={isSummarizing}
                        setIsSummarizing={setIsSummarizing}
                    />
                : null }

                {/* Action Buttons */}
                {transcription ? 
                    <ActionButtons
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}
                        transcription={transcription}
                        isSummarizing={isSummarizing}
                        handleSummarize={handleSummarize}
                    />
               : null } 
            </Box>
        </Box>
    );
}