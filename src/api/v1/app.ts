import express from "express";
import { readdirSync } from "fs";
import { join } from "path";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const routes: string[] = [];
const { HOST } = process.env;

readdirSync(join(__dirname, "./routes")).forEach((file) => {
  const route = require(`./routes/${file}`).default;
  const routeName = file.split(".")[0];
  routes.push(`${HOST}api/v1/${routeName}`);
  app.use(`/api/v1/${routeName}`, route);
});

app.use("*", (_, res) => {
  res.json({ routes });
});

export default app;
