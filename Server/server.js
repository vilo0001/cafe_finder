const express = require('express');
const cors = require('cors');
const db = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('client'));

// Connect til database.
const connection = db.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.dbpassword,
    database: "cafe"
});

// End points
app.get('/cafes',(req,res)=>{
    //parametre man kan søge efter i URL'en
    const { name, address, city, rating, size, price_range, wifi } = req.query
    let q = `SELECT * FROM cafes WHERE 1=1`;

    //array til parametre
    const params = []

    //objekt med de forskellige parametre
    const filters = {
        name,
        address,
        city,
        rating,
        size,
        price_range,
        wifi
    }

    //iterere over objektet hvis paremeteret er brugt og tilføjer til queryen
    for (let key in filters) {
        if (filters[key]) {
            q += ` AND ${key} = ?`
            params.push(filters[key])
        }
    }

    connection.query(q, params, (error, results)=>{
        res.send(results);
    })
});

//find cafeer med id
app.get('/cafes/:id',(req,res)=>{
    //hent id
    const cafeId = req.params.id
    const q = `SELECT * FROM cafes WHERE id = ?;`;
    connection.query(q, [cafeId], (error, results)=>{
        res.send(results);
    })
});


// Start server. Skal være under end points.
app.listen(port, ()=>{
    console.log("Hey guys we are officially LIVE !!!!");
});