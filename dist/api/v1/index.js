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
require("dotenv/config");
const sequelize_typescript_1 = require("sequelize-typescript");
const path_1 = require("path");
const app_1 = __importDefault(require("./app"));
const { DB_NAME, DB_USERNAME, DB_PASSWORD, PORT, PRODUCTION, DB_PORT, DB_HOST, } = process.env;
const sequelize = new sequelize_typescript_1.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    dialect: "postgres",
    logging: false,
    port: parseInt(DB_PORT),
    host: DB_HOST,
    models: [(0, path_1.join)(__dirname, "models")],
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        app_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
            yield sequelize.sync({ force: false });
            if (!PRODUCTION) {
                console.log("Server listen in port", PORT);
                console.log("connect database");
            }
        }));
    }
    catch (error) {
        console.log(error);
    }
}))();
