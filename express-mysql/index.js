const express = require('express');
const cors = require('cors');           // Cross-Origin Resource Sharing
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysqlConfig = require('./config');
const routes = require('./events');

const connection = mysql.createConnection({
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.databaseName,
    insecureAuth: true
});

connection.connect((error) => {
    if(error) {
        console.log(">>> Error: ", error);
    } else {
        connection.query(
            'select * from mysql.user where user = ? ', 
            [mysqlConfig.user],
            (error, response) => {
                console.log(">>> Query Error: ", error);
                console.log(">>> Query Response: ", response);
            }
        )
    }
});

const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: true }))
    .use(routes(connection));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.send('App Running')
});

app.listen(PORT, () => {
    console.log("App Running");
})