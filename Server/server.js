const express = require('express');
const cors = require('cors');
const db = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect til database.
const connection = db.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.dbpassword,
    database: "cafe"
});

// End points
app.get('/all',(req,res)=>{
    const q = `SELECT * FROM cafes;`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});


// Start server. Skal være under end points.
app.listen(port, ()=>{
    console.log("Hey guys we are officially LIVE !!!!");
});