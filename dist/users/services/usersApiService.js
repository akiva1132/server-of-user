"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUser = exports.editUser = exports.register = exports.getUserByEmail = exports.getUser = exports.getUsers = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = require("../helpers/bcrypt");
const jsonfileDAL_1 = require("../../dataAccessLayer/jsonfileDAL");
const jwt_1 = require("../../auth/providers/jwt");
const nodeMailer_1 = require("../../nodemailer/nodeMailer");
const getUsers = async () => {
    try {
        const users = await (0, jsonfileDAL_1.getCollectionFromJsonFile)("users");
        if (!users)
            throw new Error("no users in the database");
        return users;
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.getUsers = getUsers;
const getUser = async (userId) => {
    try {
        const users = await (0, jsonfileDAL_1.getCollectionFromJsonFile)("users");
        if (users instanceof Error)
            throw new Error("Oops... Could not get the users from the Database");
        const userFromDB = users.find((user) => user._id === userId);
        if (!userFromDB)
            throw new Error("No user with this id in the database!");
        return userFromDB;
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.getUser = getUser;
const getUserByEmail = async (email) => {
    try {
        const users = await (0, jsonfileDAL_1.getCollectionFromJsonFile)("users");
        if (users instanceof Error)
            throw new Error("Oops... Could not get the users from the Database");
        const userFromDB = users.find((user) => user.email === email);
        if (!userFromDB)
            throw new Error("No user with this id in the database!");
        return userFromDB;
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.getUserByEmail = getUserByEmail;
const register = async (user) => {
    try {
        const users = await (0, jsonfileDAL_1.getCollectionFromJsonFile)("users");
        if (users instanceof Error)
            throw new Error("Oops... Could not get the users from the Database");
        const userRegistered = users.find((userInDB) => userInDB.email === user.email);
        if (userRegistered)
            throw new Error("This user is already registered!");
        user._id = (0, uuid_1.v1)();
        user.password = (0, bcrypt_1.generateUserPassword)(user.password);
        user.isAdmin = user.isAdmin || false;
        user.credit = 0;
        user.verified = false;
        users.push({ ...user });
        await (0, nodeMailer_1.sendEmail)(user.email);
        await (0, jsonfileDAL_1.modifyCollection)("users", users);
        return user;
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.register = register;
const editUser = async (userId, userForUpdate) => {
    try {
        const users = await (0, jsonfileDAL_1.getCollectionFromJsonFile)("users");
        if (users instanceof Error)
            throw new Error("Oops... Could not get the users from the Database");
        const index = users.findIndex((user) => user._id === userId);
        if (index === -1)
            throw new Error("Could not find user with this ID!");
        const usersCopy = [...users];
        const userToUpdate = { ...usersCopy[index], ...userForUpdate };
        usersCopy[index] = userToUpdate;
        const data = await (0, jsonfileDAL_1.modifyCollection)("users", usersCopy);
        if (!data)
            throw new Error("Oops... something went wrong Could not Edit this user");
        return userToUpdate;
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.editUser = editUser;
const deleteUser = async (userId) => {
    try {
        const users = await (0, jsonfileDAL_1.getCollectionFromJsonFile)("users");
        if (users instanceof Error)
            throw new Error("Oops... Could not get the users from the Database");
        const user = users.find((user) => user._id === userId);
        if (!user)
            throw new Error("Could not find user with this ID!");
        const filteredUser = users.filter((user) => user._id !== userId);
        const data = await (0, jsonfileDAL_1.modifyCollection)("users", filteredUser);
        if (!data)
            throw new Error("Oops... something went wrong Could not Edit this user");
        return user;
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.deleteUser = deleteUser;
const login = async (userFromClient) => {
    try {
        const users = (await (0, jsonfileDAL_1.getCollectionFromJsonFile)("users"));
        if (!users)
            throw new Error("Oops... Could not get the users from the Database");
        const userInDB = users.find((user) => userFromClient.email === user.email);
        if (!userInDB)
            throw new Error("The email or password is incorrect!");
        const userCopy = { ...userInDB };
        if (!(0, bcrypt_1.comparePassword)(userFromClient.password, userCopy.password))
            throw new Error("The email or password is incorrect!");
        const token = (0, jwt_1.generateAuthToken)(userInDB);
        return token;
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.login = login;
