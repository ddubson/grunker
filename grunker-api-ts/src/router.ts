import {Express} from "express";
import {fetchAllItems} from "./OpenDataController";

export const router = (app: Express) => {
  app.get("/grunker/api/nyc311", fetchAllItems)
}
