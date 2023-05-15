const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const port = 22555;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('main');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

const fs = require('fs'); 

app.post('/', function (req, res) {
    fs.writeFileSync('./public/base.json', JSON.stringify(req.body)); 
 });

app.get('/statistics', (req, res) => {
  res.render('statistics');
});
