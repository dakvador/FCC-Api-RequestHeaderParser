var http = require('http');
const fetch = require('node-fetch');

const server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
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
})


server.listen(8080);
