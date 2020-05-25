import {Express} from "express";
import {newOpenDataRepository, pgPool} from "./OpenDataRepository";
import {Nyc311DataItem} from "./Nyc311DataItem";

const openDataRepository = newOpenDataRepository(pgPool());

export const router = (app: Express) => {
  app.get("/grunker/api/nyc311", (req, res) => {
    console.log(`Fetching NYC OpenData records @ ${Date.now()}`)
    openDataRepository.fetchAllRecords((items: Nyc311DataItem[]) => {
      res.json(items);
      console.log("Finished fetching NYC OpenData records.")
    })
  })
}