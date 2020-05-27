# Read .env file, for each var, check if exists in environment, if not, exit with message

Get-Content -Path .env | ForEach-Object {
    if(-not (Test-Path env:$_)) {
        echo "$_ is not set. Exiting."
        exit 1
    } else {
        echo "$_ is good."
    }
}
