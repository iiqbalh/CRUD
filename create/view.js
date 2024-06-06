import { layoutAdd } from './layout.js'


export function showAdd() {
    let html = ''
    html += `
    <div>
    <form action="">
        <input type="text" id="name" name="name" placeholder="insert your name" required>
        <input type="number" id="height" name="height" placeholder="insert your height" required>
        <input type="number" step="0.0001" id="weight" name="weight" placeholder="insert your weight" required>
        <input type="date" id="birthdate" name="birthdate" required>
        <select id="married" name="married" required>
            <option disabled selected>Have you married?</option>
            <option value="true">true</option>
            <option value="false">fals</option>
        </select>
    `

    html += `
    <button type="submit">Save</button>
            <a class="cancel" href="/">Cancel</a>
        </form>
    </div>
    `

    return layoutAdd('Adding Data', html)
}


