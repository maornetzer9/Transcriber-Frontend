import html2pdf from 'html2pdf.js';

const options = 
{
  margin: [10, 10, 10, 10],  
  filename: 'transcription.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  pagebreak: { mode: ['avoid-all'] }  
};

export const formatTranscription = (text, wordsPerLine) => {
  return text.split(' ').reduce((acc, word, idx) => {
    const line = Math.floor(idx / wordsPerLine);
    acc[line] = acc[line] ? acc[line] + ' ' + word : word;
    return acc;
  }, []).join('\n');
};


export const handleDownload = (transcription) => {
  const element = document.createElement('div');
  element.innerHTML = `
    <div dir="rtl" style="font-size: 14px; line-height: 1.6; width: 100%; padding: 20px; box-sizing: border-box;">
      <h1 style="page-break-before: always; text-align: center; text-decoration: underline; ">תקציר שיחה:</h1>
      <p style="page-break-inside: auto; word-wrap: break-word;">
        ${transcription}
      </p>
    </div>`;

  html2pdf().from(element).set(options).toPdf().get('pdf').then((pdf) => pdf.save());
};
