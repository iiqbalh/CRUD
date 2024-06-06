import { readFileSync } from 'fs';
import path from 'path';
import { layoutAdd } from '../create/layout.js';
const htmlPath = path.join(path.resolve(), 'read', 'index.html')
const jsonPath = path.join(path.resolve(), 'data', 'data.json')
let html = readFileSync(htmlPath, 'utf-8');
let json = readFileSync(jsonPath, 'utf-8')
let data = JSON.parse(json)

export function showRead() {

    html += `
    <table id="people">
    <thead>
    <tr>
      <th>No.</th>
      <th>Name</th>
      <th>Height</th>
      <th>Weight</th>
      <th>Birth Date</th>
      <th>Is married</th>
    </tr>
    </thead>
    <tbody>
    `


    data.forEach((item, index) => {
        html += `    
    <tr>
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.height}</td>
      <td>${item.weight}</td>
      <td>${item.birthdate}</td>
      <td>${item.married}</td>
    </tr>
    `
    })

    html += `
    </tbody>
    </table>
    `

    return layoutAdd('CRUD (Create, Read, Update, Delete)', html)
}
