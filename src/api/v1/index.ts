import "dotenv/config";
import { Sequelize } from "sequelize-typescript";
import { join } from "path";
import app from "./app";

import Question from "./models/Question";
import Option from "./models/Option";

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  PORT,
  PRODUCTION,
  DB_PORT,
  DB_HOST,
} = process.env;

const sequelize = new Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD!, {
  dialect: "postgres",
  logging: false,
  port: parseInt(DB_PORT!),
  host: DB_HOST,
  models: [join(__dirname, "models")],
});

(async () => {
  try {
    await sequelize.authenticate();
    app.listen(PORT, async () => {
      await sequelize.sync({ force: false });
      if (!PRODUCTION) {
        console.log("Server listen in port", PORT);
        console.log("connect database");
      }
    });
  } catch (error) {
    console.log(error);
  }
})();
