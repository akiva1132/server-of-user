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
const usersApiService_1 = require("../users/services/usersApiService");
const saveOrder = async (order, user) => {
    try {
        const data = await jsonfile_1.default.readFile(filePath);
        const amount = order.purchase_units[0].amount.value;
        const orderId = order.id;
        console.log(orderId);
        const index = data.orders.findIndex(order => order.id === orderId);
        console.log(index);
        if (index === -1) {
            console.log(index);
            const massage = await (0, usersApiService_1.editCredit)(user.email, amount);
            if (massage !== null) {
                return massage;
            }
            data.orders.push(order);
            jsonfile_1.default.writeFileSync(filePath, data, { spaces: 2 });
            return "success - The order data has been entered into the system";
        }
        else {
            return "We checked, this order has already been entered into the system before and used";
        }
    }
    catch (error) {
        return (0, handleErrors_1.handleJsonfileError)(error);
    }
};
exports.saveOrder = saveOrder;
