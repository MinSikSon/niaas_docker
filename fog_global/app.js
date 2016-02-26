var express = require('express');
var mysql = require('mysql'); // sms

var http = require('http'); // sms

var os = require('os');
var networkInterfaces = os.networkInterfaces();

var app = express();
var string;

// environment
app.set('port', process.env.PORT || 9000);

// mysql - connection object
var connection = mysql.createConnection({
/* for global */
//    host : 'localhost',
//    port : 3306,
/* for remote */
    host : '10.0.0.10',
    port : 9906,
    user : 'root',
    password : '<your password>'

});
var query_create_db = 'CREATE DATABASE sms';
var query_use = 'USE sms';
var query_create_table = 'CREATE TABLE sola (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(15) NOT NULL, sensor INT) ENGINE=INNODE;';
var query_explain = 'EXPLAIN sola';
var query_insert = 'INSERT INTO sola (name,sensor) VALUES(\'moonb\',100)';
var query_select = 'SELECT * from sola';

connection.connect(function(err){
  if(!err)
    console.log('success connection with DB');
  else
    console.log('Error : connection with DB');
  console.log('-------------------------------------------------');
});

connection.query(query_create_db, function(err,rows,fields){
  if(!err)
    console.log('success CREATE <db name>', rows);
  else
    console.log('Error : CREATE <db name>');
  console.log('-------------------------------------------------');

});

connection.query(query_use, function(err, rows, fields){
  if(!err)
    console.log('success USE <db name>', rows);
  else
    console.log('Error : USE <db name>');
  console.log('-------------------------------------------------');
});

connection.query(query_create_table, function(err, rows, fields){
  if(!err)
    console.log('success CREATE <table name>', rows);
  else
    console.log('Error : CREATE <table name>');
  console.log('-------------------------------------------------');
});

connection.query(query_explain, function(err, rows, fields){
  if(!err){
    // console.log('the solution is: ', rows);
    app.set('mydata_rows', rows);
  }
  else{
    console.log('Error : while performing Query');
  }
  console.log('-------------------------------------------------');
});

connection.query(query_insert, function(err, rows, fields){
  if(!err){
    // console.log('the solution is: ', rows);
    ;
  }
  else{
    console.log('Error : while insert Query');
  }
  console.log('-------------------------------------------------');
});



setInterval(function(){
  connection.query(query_select, function(err, rows, fields){
    if(!err){
      console.log('the solution is: ', rows);
      app.set('data', rows);
    }
    else{
      console.log('Error : while performing Query');
    }
    console.log('-------------------------------------------------');
  });
},2000);


// connection.end();

app.get('/', function(req, res){
    res.send('SMS APP');
});
app.get('/iface', function(req, res){
    res.send(networkInterfaces);
});
app.get('/mydata_rows', function(req, res){
    res.send(app.get('mydata_rows'));
});
app.get('/mydata_rows/data', function(req, res){
    res.send(app.get('data'));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('success createServer');
});
