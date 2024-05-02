const http=require("http");
const rout=require('./route');
const server=http.createServer(rout.handler);
console.log(rout.smartcode);

server.listen(4085);