"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = exports.handleDeleteUser = exports.handleEditUser = exports.handleUserRegistration = exports.handleGetUser = exports.orderProcessing = exports.handleGetUsers = exports.getByEmail = exports.checkOrder = void 0;
const usersApiService_1 = require("../services/usersApiService");
const SaveOrder_1 = require("../../orders/SaveOrder");
const orderVerification_1 = require("../../PayPal/orderVerification");
const handleErrors_1 = require("../../utils/handleErrors");
const userValidation_1 = __importDefault(require("../models/joi/userValidation"));
const checkOrder = async (req, res) => {
    const { orderId } = req.params;
    console.log("dfd");
    try {
        const order = await (0, orderVerification_1.orderVerification)(orderId);
        console.log(order, req.body);
        const resFromSaveOrder = await (0, SaveOrder_1.saveOrder)(order, req.body);
        res.status(201).send(resFromSaveOrder);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.checkOrder = checkOrder;
const getByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await (0, usersApiService_1.getUserByEmail)(email);
        res.status(201).send(user);
    }
    catch (error) {
        res.status(400).send("not found user");
    }
};
exports.getByEmail = getByEmail;
const handleGetUsers = async (req, res) => {
    try {
        const reqUser = req;
        const { isAdmin } = reqUser.user;
        if (!isAdmin)
            throw new Error("You must be an admin type user in order to get all the users");
        const users = await (0, usersApiService_1.getUsers)();
        return res.send(users);
    }
    catch (error) {
        if (error instanceof Error && error.message.match(/You must be/g))
            return (0, handleErrors_1.handleError)(res, error, 403);
        if (error instanceof Error)
            return (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleGetUsers = handleGetUsers;
const orderProcessing = () => {
};
exports.orderProcessing = orderProcessing;
const handleGetUser = async (req, res) => {
    try {
        const { id } = req.params;
        const reqUser = req;
        const { isAdmin, _id: userId } = reqUser.user;
        if (!isAdmin && userId !== id)
            throw new Error("You must be an admin type user or the registered user in order to get this user information");
        const user = await (0, usersApiService_1.getUser)(id);
        return res.send(user);
    }
    catch (error) {
        if (error instanceof Error && error.message.match(/You must be/g))
            return (0, handleErrors_1.handleError)(res, error, 403);
        if (error instanceof Error)
            return (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleGetUser = handleGetUser;
const handleUserRegistration = async (req, res) => {
    try {
        const user = req.body;
        const { error } = (0, userValidation_1.default)(user);
        if (error?.details[0].message)
            throw new Error(error?.details[0].message);
        const userFromDB = await (0, usersApiService_1.register)(user);
        return res.status(201).send(userFromDB);
    }
    catch (error) {
        if (error instanceof Error)
            (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleUserRegistration = handleUserRegistration;
const handleEditUser = async (req, res) => {
    try {
        const { id } = req.params;
        const reqUser = req;
        const { _id: userId } = reqUser.user;
        if (userId !== id)
            throw new Error("You must be the registered user in order to update his details");
        const user = req.body;
        const { error } = (0, userValidation_1.default)(user);
        if (error?.details[0].message)
            throw new Error(error?.details[0].message);
        const userFromDB = await (0, usersApiService_1.editUser)(id, user);
        return res.send(userFromDB);
    }
    catch (error) {
        if (error instanceof Error && error.message.match(/You must be/g))
            return (0, handleErrors_1.handleError)(res, error, 403);
        if (error instanceof Error)
            return (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleEditUser = handleEditUser;
const handleDeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const reqUser = req;
        const { _id: userId, isAdmin } = reqUser.user;
        if (userId !== id && !isAdmin)
            throw new Error("You must be a user type admin or the registered user in order to update his details");
        const user = await (0, usersApiService_1.deleteUser)(id);
        return res.send(user);
    }
    catch (error) {
        if (error instanceof Error && error.message.match(/You must be/g))
            return (0, handleErrors_1.handleError)(res, error, 403);
        if (error instanceof Error)
            return (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleDeleteUser = handleDeleteUser;
const handleLogin = async (req, res) => {
    try {
        const userFromClient = req.body;
        const { error } = (0, userValidation_1.default)(userFromClient);
        if (error?.details[0].message)
            throw new Error(error?.details[0].message);
        const token = await (0, usersApiService_1.login)(userFromClient);
        return res.status(201).send(token);
    }
    catch (error) {
        if (error instanceof Error)
            return (0, handleErrors_1.handleError)(res, error, 401);
    }
};
exports.handleLogin = handleLogin;
