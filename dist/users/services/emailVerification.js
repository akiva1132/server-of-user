"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerification = void 0;
const usersApiService_1 = require("./usersApiService");
const jsonfileDAL_1 = require("../../dataAccessLayer/jsonfileDAL");
const jsonfile_1 = __importDefault(require("jsonfile"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, "../../../DB/usersAndCodes.json");
const emailVerification = async (req, res) => {
    const email = req.body.email;
    const { code } = req.params;
    const data = jsonfile_1.default.readFileSync(filePath);
    const userFromJson = data.users.find(user => { return user.email === email; });
    if (userFromJson?.code !== code) {
        res.status(401).send("Incorrect password");
        return;
    }
    const userForUpdate = await (0, usersApiService_1.getUserByEmail)(email);
    userForUpdate.verified = true;
    try {
        const users = await (0, jsonfileDAL_1.getCollectionFromJsonFile)("users");
        if (users instanceof Error)
            throw new Error("Oops... Could not get the users from the Database");
        const index = users.findIndex((user) => user.email === email);
        if (index === -1) {
            res.status(401).send("Incorrect password");
            throw new Error("Could not find user with this ID!");
        }
        const usersCopy = [...users];
        const userToUpdate = { ...usersCopy[index], ...userForUpdate };
        usersCopy[index] = userToUpdate;
        const data = await (0, jsonfileDAL_1.modifyCollection)("users", usersCopy);
        if (!data)
            throw new Error("User authenticated but we were unable to update the system");
        res.status(201).send("authenticated user");
    }
    catch (error) {
        res.status(401).send(Promise.reject(error));
    }
};
exports.emailVerification = emailVerification;
