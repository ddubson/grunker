# Grunker

## Grunk 1: NYC OpenData querying samples

### Web

grunker-web-ts: `yarn start` (port 3000)

### API

grunker-api-ts: `yarn start` (port 5000)

#### Postgres

Install via Homebrew and set it up

```bash
brew install postgresql
brew services start postgresql
psql postgres
# Create a new user inside the psql terminal
# password must be enclosed with quotes
CREATE ROLE grunkuser WITH LOGIN PASSWORD 'grunker';

# make the newuser capable of creating, editing, and deleting databases
ALTER ROLE grunkuser CREATEDB;

CREATE DATABASE grunk_store;
```