# LevelDB Server

This is a packaged setup of a leveldb instance exposed with multilevel. It comes with some helpful modules preloaded against the leveldb instance. 

It was designed to be a docker image for quick usage of leveldb over a network connection instead of just locally.

This should be used as a tool to get familiar and to get started with leveldb. The LevelDB space is very modular and if you need more features, fork or roll your own.

Enjoy!

## NPM

`npm install leveldb-server`

### Server

```javascript

var leveldb_server = require('leveldb-server').createServer()
var db = leveldb_server.database

db.put('key', 'value')
```

### Client

```javascript
var leveldb_client = require('leveldb-server').createClient()
var client = require('./index.js').createClient()

client.connection.connect(2012, function() {
  client.database.get('testing', function(err,value) {
    console.log(err)
    console.log(value)
  })
})

```

## Docker

`docker pull ekristen/leveldb`

You can override any of the server settings using environment variables.

### Server

Run in the foreground

`docker run -it -p 2012:2012 -v /data/leveldb:/opt/app/db ekristen/leveldb`

Run in the background

`docker run -d -p 2012:2012 -v /data/leveldb:/opt/app/db ekristen/leveldb`

### Persisting Data

Use a host volume or a container volume.

`docker run -d -v /data/leveldb:/opt/app/db ekristen/leveldb`

### Environment Variables

* `leveldb_path`
* `leveldb_port`
* `leveldb_host`
* `leveldb_keyEncoding`
* `leveldb_valueEncoding`
* `leveldb_defaultTTL`
* `leveldb_checkFrequency`

## Settings

### Server

```javascript
{
  path: './db',
  host: '0.0.0.0',
  port: 2012,
  keyEncoding: 'utf8',
  valueEncoding: 'json',
  defaultTTL: 0,
  checkFrequency: 50
}
```

### Client

```javascript
{
  port: 2012
}
```
