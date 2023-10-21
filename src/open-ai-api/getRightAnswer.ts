import imageToText from './convert-image-to-text';
import fixMissingCharacters from './fix-missing-characters'
const OPEN_AI_API_KEY = 'openAI API key';
const GPT_SYSTEM_MASSAGE = 'You get multiple choice question and write the\
number of the correct answer';
const FIRST_DIGIT_REGEX =   /\d/;

const makePrompt = (question: string, options: string[]) => {
    let prompt = question + '\n\n';
    for (let i = 0; i < options.length; i++) {
        prompt += `${i + 1}. ` + options[i] + '\n';
    }
    return prompt;
};

const promptGPT = async (prompt: string) => {

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

const getRightAnswerNumber = async (question: string, images: string[], options: string[]): Promise<string | Error> => {
    try {
        // for (let image of images) {
        //     const rawCode = await imageToText(image)
        //     const fixedCode = await fixMissingCharacters(rawCode);
        //     question += '\nCode:\n' + fixedCode;
        // }
        const prompt = makePrompt(question, options);
        // const answer = await promptGPT(prompt);
        const answer = '1';
        const matched = answer.match(FIRST_DIGIT_REGEX);
        console.log('prompt:', prompt);// db
        console.log('answer:', answer);//db
        if (!matched) throw new Error('there is no number in the GPT response');
        return matched[0];
    } catch (error) {
        return Promise.reject(error);
    }
};

export default getRightAnswerNumber;