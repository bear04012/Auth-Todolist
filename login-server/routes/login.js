const express = require('express');
const router = express.Router();
const database = require('../utils/database');

const key = "SDFWEFWEFEDF";

router.get("/",(req,res) => {
    let connection = database.getConnection();
    
    let query = `SELECT * FROM user where email = '${req.query.email}' AND \`password\` = '${req.query.password}'`;
    
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            req.session.user = {
                email: req.query.email
            }
            res.json({isLoggedIn: true, key, uid: results[0].uid});
        } else {
            res.json({isLoggedIn: false});
        }
    });
     
    connection.end();
})

module.exports = router;

// npm install --save mysql
// https://www.npmjs.com/package/mysql