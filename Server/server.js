const express = require('express');
const cors = require('cors');
const db = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = db.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.dbpassword,
    database: "cafe"
});

app.get('/all',(req,res)=>{
    const q = `SELECT * FROM cafes;`;
    console.log("SELECT *");
    console.log("FROM cafes;");
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});

app.listen(port, ()=>{
    console.log("Hey guys we are officially LIVE !!!!");
});