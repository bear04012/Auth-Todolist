const express = require('express');
const router = express.Router();
const database = require('../utils/database');

const key = "SDFWEGWEFEDF";

var mysql      = require('mysql');

router.get("/",(req,res) => {
    
    let connection = database.getConnection();
    
    let query = `insert into user (email, password) values ('${req.query.email}','${req.query.password}')`;
    
    connection.query(query, function (error, results, fields) {
        if (error)  {
            if (error.code.indexOf("DUP_ENTRY") >= 0) {
                res.json({isLoggedIn: false, errorMsg: "sorry this account already exists"});
            } else {
                console.error("sign up error", error);
                res.json({isLoggedIn: false, errorMsg: "System error. Please try again"});
            }
        } else {
            res.json({isLoggedIn: true, key, uid: results.insertId});
        }
    });
     
    connection.end();
})






module.exports = router;