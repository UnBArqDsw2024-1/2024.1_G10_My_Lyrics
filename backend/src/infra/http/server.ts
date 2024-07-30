import "express-async-errors";
import { DatabaseConnection } from "../database/GetConnection";
import { app } from "./app";
import { env } from "../../config/env";

(async () => {
  const connection = DatabaseConnection.getInstance();
  await connection.$connect();

  app.listen(env.PORT, () => {
    console.log(`🚀🚀🚀 Server is running at http://localhost:${env.PORT}`);
  });
})();
