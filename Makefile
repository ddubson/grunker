# This is an example repo -- never store your strings in prod like this please.
export PG_CONNECTION_STRING=postgresql://grunkuser@127.0.0.1:5432/grunk_store

resolve-deps:
	pushd grunker-web-ts && yarn install
	pushd grunker-api-ts && yarn install

start-web:
	pushd grunker-web-ts && yarn start

start-api:
	pushd grunker-api-ts && yarn start

opendata-runonce:
	pushd grunker-api-ts && yarn runOnce:opendata

postgres.start.win:
	pg_ctl start
