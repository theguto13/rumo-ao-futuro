// Database connection
const db = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : 'MelPockasocka2@',
      database : 'rumoaofuturo'
    }
})


// Exports
module.exports = db