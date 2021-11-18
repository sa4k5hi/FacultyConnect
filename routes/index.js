var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' , demo: 'hello'});
  res.set('Content-Type', 'text/html')
  res.status(200);
  res.sendFile('login.html',{ root: './public' });
  console.log();

  // console.log(req.body.username);
});

module.exports = router;
