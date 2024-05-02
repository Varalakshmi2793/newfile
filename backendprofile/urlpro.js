const http= require('http');
const server= http.createServer(function(req,res){
    const url=req.url;
    if(url==='/home'){
        res.end("Welcome home");
    }else if(url==='/about'){
        res.end("Welcome to About Us page");
    }else if(url==='/node'){
        res.end("Welcome to my Node Js project");
    }
    else{
        
        res.end('404 Not Found');
    }
})
server.listen(1000);
