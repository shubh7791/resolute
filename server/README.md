# Backend server for resolute
> This server is used for multisig functionality

## Install deps 
```bash
# clone the repo with git and checkout to master
$ go get ./...
```

### Environment variables

Create a `.env` file with following environment variables.

``` bash
MONGOURI=127.0.0.1
DATABASE=multisig
```

## Start in DEV Mode 
Runs the app <br />
Open [http://localhost:1323](http://localhost:1323) to view it in the browser.
```bash
$ go run main.go
```