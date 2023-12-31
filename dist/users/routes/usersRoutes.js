"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersControllers_1 = require("../controllers/usersControllers");
const usersControllers_2 = require("../controllers/usersControllers");
const emailVerification_1 = require("../services/emailVerification");
const jwt_1 = require("../../auth/providers/jwt");
const router = express_1.default.Router();
router.get("/", jwt_1.auth, usersControllers_1.handleGetUsers);
router.get("/:id", jwt_1.auth, usersControllers_1.handleGetUser);
router.get("/email/:email", jwt_1.auth, usersControllers_1.getByEmail);
router.post("/", usersControllers_1.handleUserRegistration);
router.post("/checkOrder/:orderId", usersControllers_2.checkOrder);
router.put("/:id", jwt_1.auth, usersControllers_1.handleEditUser);
router.post("/emailVerification/:code", emailVerification_1.emailVerification);
router.delete("/:id", jwt_1.auth, usersControllers_1.handleDeleteUser);
router.post("/login", usersControllers_1.handleLogin);
exports.default = router;
