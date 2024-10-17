import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import DescriptionIcon from "@mui/icons-material/Description";
import { handleDownload } from "../utils/actionButton";
import ButtonModel from "./UI/ButtonModel";

export default function ActionButtons({ 
    transcription = '', 
    isCopied = false, 
    isSummarizing = false,
    setIsCopied = () => {}, 
    handleSummarize = () => {} 
}) {

    const handleCopy = () => {
        navigator.clipboard.writeText(transcription);
        setIsCopied(true);

        setTimeout(() => { setIsCopied(false); }, 2000);
    };

    return (
        <>
            <ButtonModel
                title={isCopied ? "הועתק..." : "העתק"}
                bgColor={ isCopied ? '#75ba75' : 'lightgray' }
                color={ isCopied ? 'info' : 'inherit' }
                icon={<ContentCopyIcon />}
                onClick={handleCopy}
            />
            <ButtonModel
                title="הורד PDF"
                bgColor="lightgray"
                icon={<PictureAsPdfIcon />}
                onClick={() => handleDownload(transcription)}
            />
            <ButtonModel
                title={isSummarizing ? 'מסכם...' : 'סיכום'}
                bgColor="lightgray"
                icon={<DescriptionIcon />}
                onClick={handleSummarize}
            />
            <ButtonModel
                title="תרגם עם Google"
                bgColor="lightgray"
                icon={<GTranslateIcon />}
            />
        </>
    );
}
