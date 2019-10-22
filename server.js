// server.js
// where your node app starts

// init project

var http = require('http');
const fetch = require('node-fetch');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/whoami", function (req, res) {
    const header = JSON.stringify(req.headers);
  
  const language = req.headers["accept-language"];
  const software =  req.headers["user-agent"];

  const affichage = async function(language,software){
   const ip = await fetch("https://api.ipify.org?format=json") 
                        .then(res=> res.json())
                    .then(json =>json.ip)


  res.write('{"ipaddress":"'+ip+'","language":"'+language+'","software":"'+software+'"}');
  res.end();
  }
  affichage(language,software);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
