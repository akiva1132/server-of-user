import express from "express";
import {
  handleGetUser,
  handleGetUsers,
  handleUserRegistration,
  handleEditUser,
  handleDeleteUser,
  handleLogin,
  getByEmail
} from "../controllers/usersControllers";
import { checkOrder } from "../controllers/usersControllers";
import { emailVerification } from "../services/emailVerification";
import { auth } from "../../auth/providers/jwt";
const router = express.Router();
router.get("/", auth, handleGetUsers);
router.get("/:id", auth, handleGetUser);
router.get("/email/:email", auth, getByEmail);
router.post("/", handleUserRegistration);
router.post("/checkOrder/:orderId", checkOrder );
router.put("/:id", auth, handleEditUser);
router.post("/emailVerification/:code", emailVerification);
router.delete("/:id", auth, handleDeleteUser);
router.post("/login", handleLogin);
export default router;
