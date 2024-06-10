import express from 'express'
import path from "path"
import bodyParser from "body-parser"
import { readFileSync, writeFileSync } from 'fs';

const app = express();
const datapath = path.join(path.resolve(), 'data', 'data.json')
const data = readFileSync(datapath, "utf-8")
const obj = JSON.parse(data)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.render('read', { data: obj })
})

app.get('/add', function(req, res) {
    res.render('create')
})

app.post('/add', function(req, res) {
    let data = {
        name: req.body.name, height: req.body.height, weight: req.body.weight, birthdate: req.body.birthdate, married: req.body.married
    };
    if (data.married == 'true') {
        data.married = true;
        obj.push(data);
    } else {
        data.married = false;
        obj.push(data);
    }

    writeFileSync(datapath, JSON.stringify(obj), "utf-8");
    res.redirect('/')
})

app.get('/edit/:id', function(req, res) {
    const id = req.params.id
    const item = obj[id]
    res.render('update', { item })
})

app.post('/edit/:id', function(req, res) {
    const id = req.params.id;
    obj[id] = {
        name: req.body.name, height: req.body.height, weight: req.body.weight, birthdate: req.body.birthdate, married: req.body.married
    };

    if (obj[id].married == 'true') {
        obj[id].married = true;
    } else {
        obj[id].married = false
    }

    writeFileSync(datapath, JSON.stringify(obj), 'utf-8');
    res.redirect('/')
})

app.get('/delete/:id', function(req, res) {
    const id = req.params.id;
    obj.splice(id, 1);
    writeFileSync(datapath, JSON.stringify(obj), 'utf-8');
    res.redirect('/')
})

app.listen(3000, function() {
    console.log(`Server berjalan di port 3000`)
})