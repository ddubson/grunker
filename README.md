# Grunker

## Pre-requisites

- NodeJS >= v14.3.0
- yarn >= 1.22.4

### nix

```bash
yarn first-run:nix
```

### Windows

```powershell
npm config set script-shell powershell
yarn first-run:win
```

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

## Future Grunks (TODOs)

- Dependency (prerequisite validator)

## UI Enhancements

- Icon sets: https://tablericons.com/
- React component library: PrimeReact
