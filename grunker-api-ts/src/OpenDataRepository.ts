import {Pool} from "pg";
import {fetchN311Items} from "./OpenDataGateway";
import {createNyc311Schema, initialNyc311Dml, nyc311CountRowsQuery, selectAllRecords} from "./OpenDataSchema";
import {FetchAllNyc311ComplaintsPagedResponse} from "../../grunker-domain-ts/Nyc311HttpTypes";

const numberOfRecordsToFetch = 3000;

export const pgPool = (): Pool => {
  const pool = new Pool();

  pool.connect().then(client => {
    client.query(createNyc311Schema, (err, res) => {
      if (err) {
        console.error("Schema creation failed. ", err);
      } else {
        console.log("Grunker DDL applied!");
      }
    });

    const rowCount = async () => await client.query(nyc311CountRowsQuery)
      .then((res) => Number(res.rows[0].rowcount));

    rowCount().then((count) => {
      if (count === 0) {
        console.log("Grunker DB is empty. Hydrating. Please wait!")
        fetchN311Items(numberOfRecordsToFetch).then((items) => {
          items.forEach(item => {
            client.query(initialNyc311Dml,
              [item.unique_key, item.created_date, item.agency, item.status, item.descriptor, item.city],
              (err, res) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log(`Record ${item.unique_key} inserted.`)
                }
              });
          });
        });
      } else {
        console.log("Grunker DB has data. Skipping hydration.");
      }
    });

    console.log("Grunker DB is ready!");
  });

  return pool;
}

export const newOpenDataRepository = (pgPool: Pool) => {
  const fetchAllRecords = (onSuccess: (response: FetchAllNyc311ComplaintsPagedResponse) => void) => {
    pgPool.query(selectAllRecords)
      .then(res => {
        onSuccess({
          complaints: res.rows,
          paging: {total: 10}
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  return {
    fetchAllRecords
  }
}
