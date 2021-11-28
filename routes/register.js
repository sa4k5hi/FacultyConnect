var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var alreadyExistString = req.query.alreadyExist;
    var alreadyExist = false;
    alreadyExist = (alreadyExistString == "true");
    console.log(alreadyExist);
    res.render('register',{alreadyExist: alreadyExist});
});

module.exports = router;