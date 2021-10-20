const express = require('express');
const app = express();
const mysql = require('mysql');
const http = require('http');
const cors = require('cors');
const port = 3001;

app.use(cors())
app.use(express.json());

app.use(express.json());
const db = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: '1234',
    database: 'coinsdb'
})
db.getConnection((err, conection) => {
    if (err) {
        console.error(err)
    }
    console.log('mySQL connected');
})


app.get('/getCoins', (req, res) => {
    const sqlSelect =
        "SELECT * FROM coins"
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.post("/insertCoin", (req, res) => {
    const id = req.body.id
    const symbol = req.body.symbol
    const name = req.body.name
    const image = req.body.image
    const current_price = req.body.current_price
    const sqlInsert =
        "INSERT INTO coins(id,symbol,name,image,current_price) VALUES  (?,?,?,?,?)"
    db.query(sqlInsert, [id, symbol, name, image, current_price], (err, result) => {
        if (err) throw err;
        res.send('post insert');
    })

})


const server = http.createServer(app)
server.listen(port, () => {
    console.log("Server started on port 3001");
})