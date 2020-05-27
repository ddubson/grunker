./scripts/env-var-check.ps1

if($LASTEXITCODE -eq 1) {
    exit 1
}

Push-Location grunker-web-ts
yarn install
Pop-Location

Push-Location grunker-api-ts
yarn install
Pop-Location
