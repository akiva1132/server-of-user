"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyCollection = exports.getDatabase = exports.getCollectionFromJsonFile = void 0;
const jsonfile_1 = __importDefault(require("jsonfile"));
const path_1 = __importDefault(require("path"));
const handleErrors_1 = require("../utils/handleErrors");
const DB_URL = path_1.default.join(__dirname, "../../DB/users.json");
const getCollectionFromJsonFile = async (collection) => {
    try {
        const { [collection]: data } = await jsonfile_1.default.readFile(DB_URL);
        return data;
    }
    catch (error) {
        return (0, handleErrors_1.handleJsonfileError)(error);
    }
};
exports.getCollectionFromJsonFile = getCollectionFromJsonFile;
const getDatabase = async () => {
    try {
        const data = await jsonfile_1.default.readFile(DB_URL);
        return data;
    }
    catch (error) {
        return (0, handleErrors_1.handleJsonfileError)(error);
    }
};
exports.getDatabase = getDatabase;
const modifyCollection = async (collection, documents) => {
    try {
        const data = await (0, exports.getDatabase)();
        const newData = { ...data, [collection]: documents };
        await jsonfile_1.default.writeFile(DB_URL, newData);
        return documents;
    }
    catch (error) {
        return (0, handleErrors_1.handleJsonfileError)(error);
    }
};
exports.modifyCollection = modifyCollection;
