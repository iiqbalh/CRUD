import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { layoutAdd } from '../create/layout.js';

export function reading() {
let jsonPath = path.join(path.resolve(), 'data', 'data.json')
const json = readFileSync(jsonPath, 'utf-8')
return JSON.parse(json)
}

export function writing(value) {
  writeFileSync(path.join(path.resolve(), 'data', 'data.json'), JSON.stringify(value), 'utf-8')
}

let data = reading()

export function adding(name, height, weight, birthdate, married, cb) {
  data.push({name: name, height: height, weight: weight, birthdate: birthdate, married: married === "true" ? "Yes" : "Not yet", function () {
    cb()
  }})
  writing(data)
}



export function showRead() {
  const htmlPath = path.join(path.resolve(), 'read', 'index.html')
  let html = readFileSync(htmlPath, 'utf-8');

  html += `
    <table id="people">
    <thead>
    <tr>
      <th>No.</th>
      <th>Name</th>
      <th>Height</th>
      <th>Weight</th>
      <th>Birth Date</th>
      <th>Is Married</th>
      <th>Action</th>
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
      <td>
      <a href='/edit'>Update</a>
      <a href='/'>Delete</a>
      </td>
    </tr>
    `
  })

  html += `
    </tbody>
    </table>
    `

  return layoutAdd('CRUD (Create, Read, Update, Delete)', html)
}
