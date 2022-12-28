import { Router } from "express";
import { getAllQuestions } from "../controllers/questions.controller";

const router = Router();

router.get("/", getAllQuestions);

export default router;
