"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.generateUserPassword = void 0;
const bcryptjs_1 = require("bcryptjs");
const generateUserPassword = (password) => (0, bcryptjs_1.hashSync)(password, 10);
exports.generateUserPassword = generateUserPassword;
const comparePassword = (passwordFromClient, passwordFromDB) => (0, bcryptjs_1.compareSync)(passwordFromClient, passwordFromDB);
exports.comparePassword = comparePassword;
