var express = require('express');
var router = express.Router();
var schedule_controller = require('../controllers/scheduleController');

router.get('/',schedule_controller.runn);

module.exports = router;

// mongodb+srv://saakshi:<password>@cluster0.fmyko.mongodb.net/myFirstDatabase?retryWrites=true&w=majority 


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://saakshi:<password>@cluster0.fmyko.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   perform actions on the collection object
//   client.close();
// });
// 