import axios from 'axios';
import { ORIGIN } from '../App';

export const transcribeRoute = async (formData) => {
    try 
    {
        const { data } = await axios.post(`${ORIGIN}/transcriber`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    } 
    catch(err) 
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};


export const summarizeRoute = async ( transcription, apiKey ) => {
    try 
    {
        const { data } = await axios.post(`${ORIGIN}/transcriber/summarize`, { transcription, apiKey });
        return data;
    } 
    catch(err) 
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};