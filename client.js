var net = require('net')
var xtend = require('xtend')
var multilevel = require('multilevel')
var inject = require('reconnect-core')

var level_client = function(opts) {

  var db = multilevel.client()

  var reconnect = inject(function () {
    return net.connect.apply(null, arguments)
  })
  
  var re = reconnect(opts, function (stream) {
    stream.on('error', function(err) {
      re.emit('error', err)
    })
    stream.pipe(db.createRpcStream()).pipe(stream)
  })

  
  return {
    connection: re,
    database: db
  }
}

module.exports = level_client
