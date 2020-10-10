resolve-deps:
	pushd grunker-web-ts && yarn install
	pushd grunker-api-ts && yarn install

start-web:
	pushd grunker-web-ts && yarn start

start-api:
	pusdh grunker-api-ts && yarn start:watch

opendata-runonce:
	pushd grunker-api-ts && yarn runOnce:opendata
