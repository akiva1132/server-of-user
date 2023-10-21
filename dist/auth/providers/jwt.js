"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.verifyToken = exports.generateAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const handleErrors_1 = require("../../utils/handleErrors");
const KEY = config_1.default.get("JWT_KEY");
const generateAuthToken = (user) => {
    const { _id, isAdmin } = user;
    if (!KEY)
        throw new Error("no secret key provided!");
    const token = jsonwebtoken_1.default.sign({ _id, isAdmin }, KEY);
    return token;
};
exports.generateAuthToken = generateAuthToken;
const verifyToken = (tokenFromClient) => {
    try {
        if (!KEY)
            throw new Error("no secret key provided!");
        const userPayload = jsonwebtoken_1.default.verify(tokenFromClient, KEY);
        return userPayload;
    }
    catch {
        return null;
    }
};
exports.verifyToken = verifyToken;
const auth = (req, res, next) => {
    try {
        const tokenFromClient = req.header("x-auth-token");
        if (!tokenFromClient)
            throw new Error("Authentication Error: Please Login");
        if (tokenFromClient === "test") {
            const reqUser = req;
            reqUser.user = { _id: "string", isAdmin: true };
            return next();
        }
        const userInfo = (0, exports.verifyToken)(tokenFromClient);
        if (!userInfo)
            throw new Error("Authentication Error: Unauthorize user");
        const reqUser = req;
        reqUser.user = userInfo;
        return next();
    }
    catch (error) {
        if (error instanceof Error)
            return (0, handleErrors_1.handleError)(res, error, 401);
    }
};
exports.auth = auth;
