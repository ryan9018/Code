var express = require('express');
var app = express();

app.get('/', function(request, response){
    var sql = require('mssql');

    var config = {
        user: '{username}',
        password: '{password}',
        server: '{servername}', // simply remove "tcp:"
        options: {
            encrypt: true, // Use this if you're on Windows Azure 
        database: '{databasename}'
        }
    }
    
    sql.connect(config).then(function() {
        // Query 
        
        new sql.Request().query('select * from [tableName]').then(function(recordset) {
            console.dir(recordset);
            
            response.send(recordset);
        }).catch(function(err) {
            // ... query error checks 
            console.log(err);
        });

    }).catch(function(err) {
        // ... connect error checks 
        console.log(err);
    });
      
}).listen('8080', function(){
   console.log('Server is running on port 8080...');
});