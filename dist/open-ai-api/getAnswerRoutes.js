"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getRightAnswer_1 = __importDefault(require("./getRightAnswer"));
const usersApiService_1 = require("../users/services/usersApiService");
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const { question, images, options, email1 } = req.body;
        const answerNumber = await (0, getRightAnswer_1.default)(question, images, options);
        console.log('request:', question, images, options);
        console.log('answer:', answerNumber);
        await (0, usersApiService_1.reduceCredit)(email1);
        res.send({ answerNumber });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
exports.default = router;
