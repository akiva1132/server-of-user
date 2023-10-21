"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersFromMongoDb = void 0;
const mongoose_1 = require("mongoose");
const User_1 = __importDefault(require("../users/models/mongoose/User"));
const connectToMongoDb = async () => {
    try {
        await (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/usersApp");
        return "Connect to mongoDB successfully!";
    }
    catch (error) {
        return Promise.reject(error);
    }
};
const getAllUsersFromMongoDb = async () => {
    try {
        const users = await User_1.default.find();
        return users;
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.getAllUsersFromMongoDb = getAllUsersFromMongoDb;
exports.default = connectToMongoDb;
