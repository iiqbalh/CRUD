import http from 'http'


http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
     if(req.url ==='/add'){
        res.write('<h1>about us page<h1>');
        res.end();
     }else if(req.url ==='/contact'){
        res.write('<h1>contact us page<h1>');
        res.end();
     }else{
        res.write('<h1>Hello World!<h1>');
        res.end();
     }
}).listen(3000)