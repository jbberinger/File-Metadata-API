'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Sets up multer
let storage = multer.memoryStorage();
let upload = multer({ storage: storage })

// Retrieves metadata and returns as JSON
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  let filename = req.file.filename;
  let size = req.file.size;
  res.json({
    filename: req.file.originalname, 
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
