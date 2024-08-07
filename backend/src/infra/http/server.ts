import "express-async-errors";
import { env } from "../../config/env";
import { DatabaseConnection } from "../database/GetConnection";
import { app } from "./app";

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return Number(this);
};

(async () => {
  const connection = DatabaseConnection.getInstance();
  await connection.$connect();

  app.listen(env.PORT, () => {
    console.log(`🚀🚀🚀 Server is running at http://localhost:${env.PORT}`);
  });
})();
