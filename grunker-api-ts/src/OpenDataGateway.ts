import axios, {AxiosResponse} from "axios";

const nyc311Url = "https://data.cityofnewyork.us/resource/erm2-nwe9.json";

export interface Nyc311DataItem {
  unique_key: string;
  agency: string;
  status: string;
  descriptor: string;
  city: string;
}

export const requiredEnvVarsExist = (): boolean => {
  const appTokenExists = !!process.env.NYC_OPEN_DATA_APP_TOKEN

  if(!appTokenExists) {
    console.error("NYC Open Data app token is not set!");
  }
  return appTokenExists;
}

export const fetchN311Items = async (numberOfRecords: number) =>
  axios.get(nyc311Url, {
    params: {
      "$limit": numberOfRecords,
    },
    headers: {
      "X-App-Token": process.env.NYC_OPEN_DATA_APP_TOKEN
    }
  }).then((response: AxiosResponse<Nyc311DataItem[]>) => response.data)