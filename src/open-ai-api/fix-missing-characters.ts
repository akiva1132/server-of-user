require('dotenv').config();
const OPEN_AI_API_KEY = process.env.API_KEY;


const GPT_SYSTEM_MASSAGE = `You are provided with a code extracted from a screenshot using OCR. This code contains errors related to special characters, such as single quotation marks replaced by double quotation marks, missing backtick, brackets replaced by a pipe symbol, and more.
Your task is to correct these special character errors and return the revised code.
Note that you should only address errors related to the identification of special characters and not correct any other code errors.
In addition, your response should include only the corrected code without any additional explanations or other additions.`

const fixMissingCharacters = async (code: string) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPEN_AI_API_KEY}`
    };

    const data = {
        model: 'gpt-4',
        messages: [
            {
                role: 'system',
                content: GPT_SYSTEM_MASSAGE
            },
            {
                role: 'user',
                content: code
            }
        ]
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    const jsoned = await response.json();

    const revisedCode = jsoned.choices[0].message.content;

    return revisedCode;
};

export default fixMissingCharacters;
