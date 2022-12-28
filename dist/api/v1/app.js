"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const routes = [];
const { HOST } = process.env;
(0, fs_1.readdirSync)((0, path_1.join)(__dirname, "./routes")).forEach((file) => {
    const route = require(`./routes/${file}`).default;
    const routeName = file.split(".")[0];
    routes.push(`${HOST}api/v1/${routeName}`);
    app.use(`/api/v1/${routeName}`, route);
});
app.use("*", (_, res) => {
    res.json({ routes });
});
exports.default = app;
