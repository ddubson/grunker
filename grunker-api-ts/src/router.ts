import {Express} from "express";
import {fetchN311Items, Nyc311DataItem} from "./OpenDataGateway";

export const router = (app: Express) => {
  app.get("/grunker/api/nyc311", (req, res) => {
    console.log(`Fetching NYC OpenData records @ ${Date.now()}`)
    fetchN311Items(5).then((items: Nyc311DataItem[]) => {
      res.json(items);
      console.log("Finished fetching NYC OpenData records.")
    }).catch(error => {
      console.error("Failed to fetch NYC OpenData records; ", error)
    })
  })
}