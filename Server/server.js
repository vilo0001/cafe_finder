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
    const { id, name, address, city, rating, size, price_range, wifi } = req.query
    let q = `SELECT * FROM cafes WHERE 1=1`;

    //array til parametre
    const params = []

    //objekt med de forskellige parametre
    const filters = {
        id,
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

app.post('/cafes/new', (req,res) => {
    //parametre man kan søge efter i URL'en
    const json = req.body;

    connection.connect(function(err) {
        if (err) throw err;
        const q = `INSERT INTO cafes(name, address, city, rating, size, price_range, wifi) VALUES("${json.name}","${json.address}","${json.city}",${json.rating},"${json.size}","${json.price_range}",${json.wifi})`;
        connection.query(q, function (err, result) {
            if (err) throw err;
            res.send("1 record inserted");
        });
    });
});


// Start server. Skal være under end points.
app.listen(port, ()=>{
    console.log("Hey guys we are officially LIVE !!!!");
});