"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questions_controller_1 = require("../controllers/questions.controller");
const router = (0, express_1.Router)();
router.get("/", questions_controller_1.getAllQuestions);
exports.default = router;
