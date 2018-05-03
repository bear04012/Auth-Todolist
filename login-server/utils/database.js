var mysql      = require('mysql');

module.exports.getConnection = function() {
    var connection = mysql.createConnection({
      host     : 'irvinecode2.chusgomumeej.us-west-2.rds.amazonaws.com',
      user     : 'master',
      password : 'ar.length-1',
      database : 'yoon'
    });

    connection.connect();    
    return connection;
}