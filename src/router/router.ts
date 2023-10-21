import express, { Request, Response } from "express";
const router = express.Router();
import usersRoutes from "../users/routes/usersRoutes";
import getAnswerRoutes from "../open-ai-api/getAnswerRoutes"

router.use("/api", usersRoutes);
router.use("/api/get-answer/", getAnswerRoutes);
router.use(express.static("../../public"));

router.use("*", (req: Request, res: Response) =>
  res.status(404).send("Page not found!")
);

export default router;
