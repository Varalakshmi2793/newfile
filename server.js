const http= require("http");
const server= http.createServer((req, res)=>{
    res.end("lakshmi")
});
server.listen(4000);