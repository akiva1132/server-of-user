import express from 'express';
import getRightAnswerNumber from './getRightAnswer';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { question, images, options } = req.body;

        const answerNumber = await getRightAnswerNumber(question, images, options);
        console.log('request:', question, images, options)// db
        console.log('answer:', answerNumber);// db
        res.send({ answerNumber });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})
export default router;