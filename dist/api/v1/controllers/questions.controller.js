"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllQuestions = void 0;
const Option_1 = __importDefault(require("../models/Option"));
const Question_1 = __importDefault(require("../models/Question"));
const getAllQuestions = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Question_1.default.findAll({
            include: [Option_1.default],
        });
        return res.json({
            data: data.map((item) => {
                const options = item.dataValues.options.reduce((acc, item) => {
                    acc[item.key] = item.description;
                    return acc;
                }, {});
                item.dataValues.options = options;
                return item;
            }),
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getAllQuestions = getAllQuestions;
