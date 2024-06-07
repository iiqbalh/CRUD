import { readFileSync } from 'fs';
import http from 'http'
import { showAdd } from './create/view.js'
import { showRead } from './read/layout.js'
import { showUpdate } from './update/layout.js'
import { adding } from './read/layout.js';



http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (req.url === '/add') {
        if (req.method === "POST") {
            let body = "";
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', function () {
                let params = new URLSearchParams(body);

                adding(params.get("name"), Number(params.get("height")), Number(params.get("weight")), params.get("birthdate"), params.get("married"), function () {
                    res.writeHead(301, {
                        location: 'http://127.0.0.1:3000'
                    }).end();
                })
            })
        } else {
            res.write(showAdd());
            res.end();
        }
    } else if (req.url === '/edit') {
        res.write(showUpdate());
        res.end();
    }else if (req.url === '/delete') {
        res.end(confirm(`apakah kamu yakin akan menghapus data${params.get("name")}`));
    } else if (req.url === '/style.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        let css = readFileSync('./style.css')
        res.write(css);
        res.end();
    } else {
        res.write(showRead());
        res.end();
    }
}).listen(3000)




















// [
//     {
//       "name": "himawan",
//       "height": 168,
//       "weight": 80.52,
//       "birthdate": "1991-03-12",
//       "married": false
//     },
//     {
//       "name": "rahmat",
//       "height": 171,
//       "weight": 52.69,
//       "birthdate": "1996-11-03",
//       "married": true
//     },
//     {
//       "name": "aziz",
//       "height": 167,
//       "weight": 57.5,
//       "birthdate": "1996-05-13",
//       "married": false
//     }
// ]    