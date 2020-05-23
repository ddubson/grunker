"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var OpenDataGateway_1 = require("./OpenDataGateway");
var router_1 = require("./router");
var cors_1 = __importDefault(require("cors"));
console.log("Verifying env is setup right...");
if (!OpenDataGateway_1.requiredEnvVarsExist()) {
    console.error("Required env vars are not set. Exiting.");
    process.exit(1);
}
var app = express_1.default();
app.use(cors_1.default({ origin: "*" }));
router_1.router(app);
var port = process.env.PORT || 5000;
app.listen(port);
console.log("Grunker API listening on port " + port);
