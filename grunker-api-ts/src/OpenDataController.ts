import {newOpenDataRepository, pgPool} from "./OpenDataRepository";
import {Request, Response} from "express";
import {FetchAllNyc311ComplaintsPagedResponse} from "../../grunker-domain-ts/Nyc311HttpTypes";

const openDataRepository = newOpenDataRepository(pgPool());

export const fetchAllItems = (req: Request, res: Response) => {
  console.log(`Fetching NYC OpenData records @ ${Date.now()}`)
  openDataRepository.fetchAllRecords((response: FetchAllNyc311ComplaintsPagedResponse) => {
    res.json(response);
    console.log("Finished fetching NYC OpenData records.")
  })
};
