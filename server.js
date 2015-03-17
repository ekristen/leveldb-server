var net = require('net')
var xtend = require('xtend')
var level = require('level-hyper')
var ttl = require('level-ttl')
var multilevel = require('multilevel')

var level_server = function(opts) {
  var self = this

  options = xtend({
    path: './db',
    keyEncoding: 'utf8',
    valueEncoding: 'json',
    defaultTTL: 0,
    checkFrequency: 50
  }, opts)
  
  var db = level(options.path, { keyEncoding: options.keyEncoding, valueEncoding: options.valueEncoding })

  ttl(db, {
    defaultTTL: options.defaultTTL,
    checkFrequency: options.checkFrequency
  })

  var close = db.close
  db.close = function() {
    db.stop()
    close.apply(db,arguments)
  }

  // Aliases to match with "redis" function names
  db.set = db.put
  db.expire = db.ttl

  // Useful check if key exists.
  db.exists = function(key, callback) {
    db.get(key, function(err, result) {
      if (err && err.status !='404') {
        return callback(err)
      }
      else if (err && err.status == '404') {
        return callback(null, false)
      }

      callback(null, true)
    })
  }

  var server = net.createServer(function (con) {
    con.on('error', function(err) {
      self.emit('error', err)
    })
    
    var rpc = multilevel.server(db)
    rpc.on('error', function(err) {
      self.emit('error', err)
    })

    con.pipe(rpc).pipe(con)
  })

  server.db = db

  return server
}

module.exports = level_server
