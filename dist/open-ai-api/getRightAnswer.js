"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OPEN_AI_API_KEY = 'openAI API key';
const GPT_SYSTEM_MASSAGE = 'You get multiple choice question and write the\
number of the correct answer';
const FIRST_DIGIT_REGEX = /\d/;
const makePrompt = (question, options) => {
    let prompt = question + '\n\n';
    for (let i = 0; i < options.length; i++) {
        prompt += `${i + 1}. ` + options[i] + '\n';
    }
    return prompt;
};
const promptGPT = async (prompt) => {
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
                content: prompt
            }
        ]
    };
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
    const jsoned = await response.json();
    const answer = jsoned.choices[0].message.content;
    return answer;
};
const getRightAnswerNumber = async (question, images, options) => {
    try {
        const prompt = makePrompt(question, options);
        const answer = '1';
        const matched = answer.match(FIRST_DIGIT_REGEX);
        console.log('prompt:', prompt);
        console.log('answer:', answer);
        if (!matched)
            throw new Error('there is no number in the GPT response');
        return matched[0];
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.default = getRightAnswerNumber;
