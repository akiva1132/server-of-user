"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveOrder = void 0;
const jsonfile_1 = __importDefault(require("jsonfile"));
const path_1 = __importDefault(require("path"));
const handleErrors_1 = require("../utils/handleErrors");
const filePath = path_1.default.join(__dirname, '../../DB/orders.json');
const saveOrder = async (order) => {
    try {
        const data = await jsonfile_1.default.readFile(filePath);
        const index = data.orders.findIndex(order => order.id === order.id);
        if (index === -1) {
            data.orders.push(order);
            jsonfile_1.default.writeFileSync(filePath, data, { spaces: 2 });
            return "The order data has been entered into the system";
        }
        else {
            throw new Error("The order already exists");
        }
    }
    catch (error) {
        return (0, handleErrors_1.handleJsonfileError)(error);
    }
};
exports.saveOrder = saveOrder;
