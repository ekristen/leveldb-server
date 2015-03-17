#!/usr/bin/env node

var opts = require('rc')('leveldb', {
  port: 2012,
  host: '0.0.0.0'
})

var server = require('../index.js').createServer(opts)

server.listen(opts.port, opts.host, function() {
  console.log('LevelDB Server Listening on %s:%s', opts.host, opts.port)
})
