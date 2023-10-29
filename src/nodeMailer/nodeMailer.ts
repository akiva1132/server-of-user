import nodemailer from 'nodemailer';
import jsonfile from 'jsonfile';
import path from 'path';
const filePath = path.join(__dirname, '../../DB/usersAndCodes.json');

function generateRandom6DigitNumber() {
  const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  return randomNumber;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'akiva1132@gmail.com',
    pass: 'dhio wevz rjpc mfou',
  },
});

export const sendEmail = async (addressee: string) => {
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

    const data:Record<string, Record<string, unknown>[]> = jsonfile.readFileSync(filePath);
    const index = data.users.findIndex(user => user.email === addressee);
    if (index !== -1) {
      data.users[index] = user;
    } else {
      data.users.push(user);
    }
    jsonfile.writeFileSync(filePath, data, { spaces: 2 });
    console.log(info.response);
    return [info.response];
  } catch (error) {
    console.log(error);
    return [error];
  }
};
