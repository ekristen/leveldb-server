var client = require('./index.js').createClient()

client.connection.connect(2012, '192.168.1.127', function() {
  client.database.get('testing', function(err,value) {
    console.log(err)
    console.log(value)
  })
})
