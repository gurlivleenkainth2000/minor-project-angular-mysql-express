const express = require('express');
const mysql = require('mysql');
const mysqlConfig = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.databaseName,
    insecureAuth: true
});

connection.connect();
app.listen(PORT, () => {
    console.log("App Running");
})