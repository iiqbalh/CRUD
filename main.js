const { readFileSync, writeFileSync } = require('node:fs');
const path = require('node:path');
const http = require('http');
const dataPath = path.join(path.resolve(), 'data', 'data.json');
const json = readFileSync(dataPath, 'utf-8');
const data = JSON.parse(json);
const url = require('url')
const querystring = require('querystring')
const { readHtml, create } = require('./read');
const { drawRead, drawUpdate, drawCreate } = require('./draw');

http.createServer(function (req, res) {

    if (req.url == '/') {
        res.end(drawRead(data));

    } else if (req.url == '/add') {
        if (req.method == 'POST') {
            let body = '';
            req.on('data', function (chunk) {
                body += chunk;
            });
            req.on('end', function () {
                let params = new URLSearchParams(body);
                data.push({
                    name: params.get('nama'),
                    height: JSON.parse(params.get('height')),
                    weight: JSON.parse(params.get('weight')),
                    birthdate: params.get('date'),
                    married: params.get('married') == 'true' ? true : false
                });
                writeFileSync(dataPath, JSON.stringify(data, null, 2));
                res.writeHead(301, {
                    location: 'http://localhost:3000/', 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                    'Surrogate-Control': 'no-store',
                }).end()
            });
        } else {
            res.end(create.replace('#title#', 'Adding Data').replace('#nama#', '').replace('#married#', drawCreate()))
        }

    } else if (req.url.startsWith('/Remove')) {
        const params = querystring.parse(url.parse(req.url).query);
        let id = params.id;
        data.splice(id, 1);
        console.log(id)
        writeFileSync(dataPath, JSON.stringify(data, null, 2));
        res.writeHead(302, {
            location: 'http://localhost:3000/', 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Surrogate-Control': 'no-store',
        }).end()

    } else if (req.url.startsWith('/edit')) {
        const params2 = querystring.parse(url.parse(req.url).query);
        let id = params2.id

        if (req.method == 'POST') {
            let body = '';
            req.on('data', function (chunk) {
                body += chunk;
            });
            req.on('end', function () {
                let params = new URLSearchParams(body);
                data[id] = {
                    name: params.get('nama'),
                    height: JSON.parse(params.get('height')),
                    weight: JSON.parse(params.get('weight')),
                    birthdate: params.get('date'),
                    married: params.get('married') == 'true' ? true : false
                }
                writeFileSync(dataPath, JSON.stringify(data, null, 2));
                res.writeHead(301, {
                    location: 'http://localhost:3000/', 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                    'Surrogate-Control': 'no-store',
                }).end()
            });

        } else {
            res.end(create.replace('#nama#', data[id].name).replace('#height#', data[id].height).replace('#weight#', data[id].weight).replace('#date#', data[id].birthdate).replace('#married#', drawUpdate(data[id])).replace('#title#', 'Updating Data'));
        }
    } else {
        res.end(readHtml('ERROR', '<h2>404</h2>'))
    }
}).listen(3000)

