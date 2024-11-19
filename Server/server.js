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
    const queryParameter = req.query.type;
    const q = "SELECT * FROM movies";
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});