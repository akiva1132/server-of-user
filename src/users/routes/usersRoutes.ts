import express from "express";
import {
  handleGetUser,
  handleGetUsers,
  handleUserRegistration,
  handleEditUser,
  handleDeleteUser,
  handleLogin,
} from "../controllers/usersControllers";
import { checkOrder } from "../controllers/usersControllers";
import { emailVerification } from "../services/emailVerification";
import { auth } from "../../auth/providers/jwt";
const router = express.Router();

router.get("/", auth, handleGetUsers);
router.get("/:id", auth, handleGetUser);
router.post("/", handleUserRegistration);
router.post("/checkOrder/:orderId", auth, checkOrder );
router.put("/:id", auth, handleEditUser);
router.post("/emailVerification/:code", emailVerification);
router.delete("/:id", auth, handleDeleteUser);
router.post("/login", handleLogin);
export default router;
