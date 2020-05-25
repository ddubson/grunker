const createSchema = `
  CREATE SCHEMA IF NOT EXISTS grunkschema;
`;

const createTable = `
    CREATE TABLE IF NOT EXISTS grunkschema.nyc311 (
        unique_key VARCHAR(20) PRIMARY KEY,
        created_date TIMESTAMP NOT NULL,
        agency VARCHAR(50) NULL,
        status VARCHAR(50) NULL,
        descriptor VARCHAR(500) NULL,
        city VARCHAR(100) NULL
    );
`;

export const createNyc311Schema = `${createSchema} ${createTable}`;

export const initialNyc311Dml = `
  INSERT INTO grunkschema.nyc311 (unique_key, created_date, agency, status, descriptor, city)
    VALUES ($1, $2, $3, $4, $5, $6);
`;

export const nyc311CountRowsQuery = "SELECT COUNT(*) as rowCount FROM grunkschema.nyc311";
export const selectAllRecords = "SELECT * FROM grunkschema.nyc311";