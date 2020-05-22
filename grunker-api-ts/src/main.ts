import express from "express";
import {requiredEnvVarsExist} from "./OpenDataRepository";
import {router} from "./router";
import cors from "cors";

console.log("Verifying env is setup right...")
if (!requiredEnvVarsExist()) {
  console.error("Required env vars are not set. Exiting.");
  process.exit(1);
}

const app = express();
app.use(cors({origin: "*"}))

router(app);

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Grunker API listening on port ${port}`);