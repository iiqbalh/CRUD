import { readFileSync } from 'fs';
import http from 'http'
import { showAdd } from './views/view.js'


http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
     if(req.url ==='/add'){
        res.write(showAdd());
        res.end();
     }else if(req.url ==='/contact'){
        res.write('<h1>contact us page<h1>');
        res.end();
     }else if(req.url ==='/style.css'){
        res.writeHead(200, {'Content-Type': 'text/css'});
        let css = readFileSync('./style.css')
        res.write(css);
        res.end();
     }else{
        res.write('<h1>Hello World!<h1>');
        res.end();
     }
}).listen(3000)
