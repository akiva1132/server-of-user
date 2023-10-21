"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonfile_1 = __importDefault(require("jsonfile"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, '../../DB/usersAndCodes.json');
function generateRandom6DigitNumber() {
    const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    return randomNumber;
}
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'akiva1132@gmail.com',
        pass: 'evhx ibjv iufe soef',
    },
});
const sendEmail = async (addressee) => {
    const code = generateRandom6DigitNumber();
    const mailOptions = {
        from: 'solve google forms',
        to: addressee,
        subject: 'Email address verification',
        text: `Your verification code is ${code}`,
    };
    console.log(addressee);
    try {
        const info = await transporter.sendMail(mailOptions);
        const user = {
            email: addressee,
            code: code.toString(),
        };
        const data = jsonfile_1.default.readFileSync(filePath);
        const index = data.users.findIndex(user => user.email === addressee);
        if (index !== -1) {
            data.users[index] = user;
        }
        else {
            data.users.push(user);
        }
        jsonfile_1.default.writeFileSync(filePath, data, { spaces: 2 });
        console.log(info.response);
        return [info.response];
    }
    catch (error) {
        console.log(error);
        return [error];
    }
};
exports.sendEmail = sendEmail;
