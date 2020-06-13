import {useEffect, useState} from "react";
import axios from "axios";

interface Nyc311DataItem {
  unique_key: string;
  created_date: string;
  agency: string;
  status: string;
  descriptor: string;
  city: string;
}

export const useNyc311Service = () => {
  const [items, setItems] = useState<Nyc311DataItem[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/grunker/api/nyc311")
      .then((response) => response.data)
      .then(items => setItems(items))
  }, [])

  return items;
}
