var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.set('Content-Type', 'text/html')
  res.status(200);
  res.sendFile('index.html',{ root: './public' });
  console.log();

});

module.exports = router;
