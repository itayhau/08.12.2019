
npm init
npm install express --save-dev
npm install cors --save
node index.js// -- instead: nodemon app.js !!!!!!!!!


index.js:
~~~~~~~~~~

const express = require('express');
const app = express();
const router = express.Router();
const port = 8080;

var path = require('path');
var http = require("http");
var url = require("url");
var cors = require("cors");


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, '../')));

app.options('*', cors()); 


// static page:
// url: http://localhost:3000/
//app.get('/', (request, response) => {response.sendFile(path.join(__dirname+'/index.html')); });
// same for image

// url: http://localhost:3000/
app.get('/', (request, response) => response.send('Hello World'));

// all routes prefixed with /api
app.use('/api', router);



// using router.get() to prefix our path
// url: http://localhost:3000/api/
router.get('/', (request, response) => {
  response.json({message: 'Hello, welcome to my server'});
});



router.get('/stuff', (request, response) => {
    var urlParts = url.parse(request.url, true);
    var parameters = urlParts.query;
    var myParam = parameters.myParam;
    // e.g. myVenues = 12;
    
    var myResponse = `I multiplied the number you gave me (${myParam}) by 5 and got: ${myParam * 5}`;
    
    response.json({message: myResponse});
  });

  router.get('/todo', (request, response) => {
    var urlParts = url.parse(request.url, true);
    var parameters = urlParts.query;
    var myParam = parameters.myParam;
    // e.g. myVenues = 12;
    
    var myResponse = `I multiplied the number you gave me (${myParam}) by 5 and got: ${myParam * 5}`;
    
    response.json([
        {
          "userId": 1,
          "id": 1,
          "title": "delectus aut autem",
          "completed": false
        },
        {
          "userId": 1,
          "id": 2,
          "title": "quis ut nam facilis et officia qui",
          "completed": false
        }]);
  });  

  router.post('/todo', (request, response) => {
    var urlParts = url.parse(request.url, true);
    var parameters = urlParts.query;
    var myParam = parameters.myParam;
    // e.g. myVenues = 12;
    
    var myResponse = `I multiplied the number you gave me (${myParam}) by 5 and got: ${myParam * 5}`;
    
    response.json([
        {
          "userId": 1,
          "id": 1,
          "title": "POST",
          "completed": false
        },
        {
          "userId": 1,
          "id": 2,
          "title": "POST",
          "completed": false
        }]);
  });  
  

// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));



browse to:
localhost:8080
localhost:8080/api/
localhost:8080/api/
http://localhost:8080/api/stuff?myParam=5

maybe postman?
http://localhost:8080/api/todo

post:
http://localhost:8080/api/todo
