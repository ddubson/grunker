const table_nyc311 = `nyc311`;

const createTable = `
    CREATE TABLE IF NOT EXISTS ${table_nyc311} (
        unique_key VARCHAR(20) PRIMARY KEY,
        created_date TIMESTAMP NOT NULL,
        agency VARCHAR(50) NULL,
        status VARCHAR(50) NULL,
        descriptor VARCHAR(500) NULL,
        city VARCHAR(100) NULL
    );
`;

const createIndex = `
  CREATE INDEX IF NOT EXISTS nyc311_id ON ${table_nyc311} (unique_key);
`;

export const createInitialDDL = `${createTable} ${createIndex}`;

export const initialNyc311Dml = `
  INSERT INTO ${table_nyc311} (unique_key, created_date, agency, status, descriptor, city)
    VALUES ($1, $2, $3, $4, $5, $6);
`;

export const nyc311CountRowsQuery = `SELECT COUNT(*) as rowCount FROM ${table_nyc311}`;

export const selectAllRecords = `
  SELECT * FROM ${table_nyc311}
  ORDER BY created_date desc 
  LIMIT 10 OFFSET 0
`;
