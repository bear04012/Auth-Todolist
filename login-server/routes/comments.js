const express = require('express');
const router = express.Router();
const database = require('../utils/database');

router.get("/", (req, res) => {
    let connection = database.getConnection();
     
    connection.query('SELECT `email`, `text`, `dateTime`, `date` FROM comment', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
     
    connection.end();
})

router.put("/",(req,res) => {
    
    let connection = database.getConnection();
    
    let query = `insert into comment (email, text) values ('${req.body.email}','${req.body.comment}')`;
    
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
     
    connection.end();
})

module.exports = router;