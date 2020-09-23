import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {Nyc311Complaint} from "../../grunker-domain-ts/Nyc311Complaint";
import {FetchAllNyc311ComplaintsPagedResponse} from "../../grunker-domain-ts/Nyc311HttpTypes";

export const useNyc311Service = () => {
  const [items, setItems] = useState<Nyc311Complaint[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/grunker/api/nyc311")
      .then((response: AxiosResponse) => response.data)
      .then((response: FetchAllNyc311ComplaintsPagedResponse) => setItems(response.complaints))
  }, [])

  return items;
}
