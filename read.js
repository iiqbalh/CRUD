const { readFileSync } = require('node:fs');
const read = readFileSync('./views/read.html', 'utf-8');
const create = readFileSync('./views/create.html', 'utf-8');

function readHtml(title, content) {
    return read.replace('#title#', title).replace('#content#', content)
}

module.exports = { readHtml, create}