import {Pool, PoolClient} from "pg";

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

export const pgPool = (): Pool => {
  const pool = new Pool();

  pool.connect().then(client => {
    client.query("SELECT NOW()", (err, res) => {
      console.log("Connected to PgSql");
    });
    client.query(createNyc311Schema, (err, res) => {
      if (err) {
        console.error("Schema creation failed. ", err);
      } else {
        console.log("Grunker DDL applied!");
      }
    });
    client.release();
  });

  return pool;
}

export const newOpenDataRepository = (pgPool: Pool) => {
  const fetchFirstFiveRecords = (onSuccess) => {
    pgPool.query("SELECT * FROM nyc_311_data LIMIT 5", (err, res) => {
      onSuccess(res.rows)
    })
  }

  return {
    fetchFirstFiveRecords
  }
}