const express = require('express');
const router = express.Router()


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET,DELETE,HEAD,PUT,POST");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.use('/login', require('./login'));
router.use('/sign-up', require('./sign-up'));
router.use('/comments', require('./comments'));


router.get('/test', (req,res) => {
    console.log(req.cookies);
    console.log(req.session);
    res.json({
        test: "good"
    })
});



router.get("*", (req, res) => {
    res.send("404");
});


module.exports = router;