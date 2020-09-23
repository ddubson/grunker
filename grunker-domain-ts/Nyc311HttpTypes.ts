import {Nyc311Complaint} from "./Nyc311Complaint";

export type FetchAllNyc311ComplaintsPagedResponse = {
  complaints: Nyc311Complaint[],
  paging: {
    total: number
  }
}
