var express = require('express');
var app = express();
var bodyPaser = require('body-parser');
var server = require('http').createServer(app);
var config  = require('./config');
var billCal = require('./BillCalculator');
var sql = require('./slqliteControl');

app.set('port', process.env.PORT | 9000);
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTION");
  next();
});

sql.createTable();

app.get('/', (req, res)=>{
  res.send({ data:'hello world'})
});

app.post('/sendbill', (req, res)=>{
  let bill = billCal.Bill(req.query.promotionKey, req.query);
  res.send(bill);
})

server.listen(app.get('port'), ()=> {
  console.log(`Server running on port ${server.address().port}`);
});