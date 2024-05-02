const fs=require('fs');
const requesthandler=(req,res)=>{
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    fs.readFile('message.txt', 'utf8', (err, data) => {
      let messages = '';
      if (data) {
        messages = data;
      }

      res.write('<html>');
      res.write('<head><title>Enter Message</title></head>');
      res.write('<body>');
           
      res.write(`<ul>${messages}</ul>`);
      res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
      res.write('</body>');
      res.write('</html>');
      return res.end();
    });
  }

  if (url === '/message' && method === 'POST') {
    const msg = [];
    req.on('data', (chunk) => {
      msg.push(chunk);
    });
    return req.on('end', () => {
      const body = Buffer.concat(msg).toString();
      const message = body.split('=')[1];
      fs.writeFile('message.txt', `${message}\n`, (err) => {
        if (err) {
          
          return res.end('Error writing file');
        }
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
 }

 //module.exports = requesthandler;
 //module.exports=  {
  //  handler: requesthandler,
  //  smartcode: "Welcome to Route code"
  // }
module.exports.handler=requesthandler;
module.exports.smartcode="welcome to code";
