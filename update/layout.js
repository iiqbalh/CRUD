import path from 'path';
import { readFileSync } from 'fs';
import { layoutAdd } from '../create/layout.js';
import { reading } from '../read/layout.js'


let data = reading()



export function showUpdate() {
    const htmlPath = path.join(path.resolve(), 'update', 'index.html')
    let html = readFileSync(htmlPath, 'utf-8');

    html += `
    <div>
    <form action="/add" method="post">
        <input type="text" id="name" name="name" value=>
        <input type="number" id="height" name="height" value=>
        <input type="number" step="0.01" id="weight" name="weight" value=>
        <input type="date" id="birthdate" name="birthdate" value=>
        <select id="married" name="married" value=>>
            <option disabled selected>Have you married?</option>
            <option value="true">true</option>
            <option value="false">false</option>
        </select>
        <button type="submit">Save</button>
        <a class="cancel" href="/">Cancel</a>
    </form>
</div>
    `

    return layoutAdd('updating Data', html)
}