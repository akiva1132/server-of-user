import express from 'express';
import getRightAnswerNumber from './getRightAnswer';
import { reduceCredit } from '../users/services/usersApiService';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { question, images, options, email1 } = req.body;
        const answerNumber = await getRightAnswerNumber(question, images, options);
        console.log('request:', question, images, options)// db
        console.log('answer:', answerNumber);// db
        await reduceCredit(email1)
        res.send({ answerNumber });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})
export default router;