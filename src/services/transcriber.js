import { summarizeRoute, transcribeRoute } from "../routes/transcriber";

export const transcribeService = async (file, apiKey, language, model, outputFormat ) => {
    try
    {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('apiKey', apiKey);
        formData.append('language', language);
        formData.append('model', model);
        formData.append('outputFormat', outputFormat);
        
        const response = await transcribeRoute(formData);
        const { code, message, transcribe } = response;

        if( code !== 200 ) return alert(message); 

        return transcribe;
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};


export const summarizeService = async (transcription, apiKey) => {
    try
    {
        const response = await summarizeRoute(transcription, apiKey);
        const { code, message, summary } = response;

        if( code !== 200 ) return alert(message); 

        return summary;
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};