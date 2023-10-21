"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInitialUsers = void 0;
const usersApiService_1 = require("../users/services/usersApiService");
const chalk_1 = __importDefault(require("chalk"));
const data = {
    users: [
        { email: "regular@gmail.com", password: "Aa1234!", isAdmin: false },
        { email: "business@gmail.com", password: "Aa1234!", isAdmin: false },
        { email: "admin@gmail.com", password: "Aa1234!", isAdmin: true },
    ],
};
const generateInitialUsers = async () => {
    debugger;
    try {
        const usersInDB = await (0, usersApiService_1.getUsers)();
        if (Array.isArray(usersInDB) && usersInDB.length)
            return null;
        const users = [];
        for (const user of data.users) {
            try {
                const userInDB = await (0, usersApiService_1.register)(user);
                users.push(userInDB);
            }
            catch (error) {
                if (error instanceof Error)
                    console.log(chalk_1.default.redBright(error.message));
            }
        }
        Promise.resolve(users);
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        Promise.reject(error);
    }
};
exports.generateInitialUsers = generateInitialUsers;
