const http=require('http');

http.createServer(function(req,res) {
    res.end("Welcome to my Node Js project");
}).listen(3000);