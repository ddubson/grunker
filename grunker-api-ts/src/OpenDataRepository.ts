import {Pool, PoolClient} from "pg";
import {fetchN311Items} from "./OpenDataGateway";

const createNyc311Schema = `
    CREATE SCHEMA IF NOT EXISTS grunkschema;
    
    CREATE TABLE IF NOT EXISTS grunkschema.nyc311 (
        unique_key VARCHAR(20) PRIMARY KEY,
        agency VARCHAR(50) NULL ,
        status VARCHAR(50) NULL ,
        descriptor VARCHAR(500) NULL ,
        city VARCHAR(100) NULL
    );
`;

const initialNyc311Dml = `
  INSERT INTO grunkschema.nyc311 (unique_key, agency, status, descriptor, city)
    VALUES ($1, $2, $3, $4, $5);
`;

const nyc311CountRowsQuery = "SELECT COUNT(*) as rowCount FROM grunkschema.nyc311";
const selectAllRecords = "SELECT * FROM grunkschema.nyc311";

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
        fetchN311Items(100).then((items) => {
          items.forEach(item => {
            client.query(initialNyc311Dml,
              [item.unique_key, item.agency, item.status, item.descriptor, item.city],
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
  const fetchAllRecords = (onSuccess: (rows: any[]) => void) => {
    pgPool.query(selectAllRecords)
      .then(res => {
        onSuccess(res.rows)
      }).catch(err => {
      console.error(err);
    })
  }

  return {
    fetchAllRecords
  }
}