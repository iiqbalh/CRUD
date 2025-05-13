const { readHtml, createHtml } = require("./read");
function drawRead(json) {
    let html = ''

    html += `
    <table id="data">
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
    json.forEach((item, index) => {
        html += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.height}</td>
            <td>${item.weight}</td>
            <td>${item.birthdate}</td>
            <td>${item.married ? 'Yes' : 'Not Yet'}</td>
            <td>
            <a href="/edit?id=${index}">Update</a>
            <a href="/Remove?id=${index}" onclick="return confirm('apakah kamu yakin akan menghapus data ${item.name}?')">Delete</a>
            </td>
        </tr>
        `
    });

    html += `
     </tbody>
</table>
    `
    return readHtml('CRUD (Create, Read, Update, Delete)', html)
}



function drawUpdate(json) {
    let html = '';
    html += `
    <select id="married" name="married" required>
    `

    html += `
        <option disabled>Have you married?</option>
        <option value="true" ${json.married ? " selected" : ''}>True</option>
        <option value="false" ${!json.married ? " selected" : ''}>False</option>
                `
    html += `
        </select>`
        return html
}

function drawCreate() {
    let html = '';
    html += `
    <select id="married" name="married" required>
    `

    html += `
        <option disabled selected>Have you married?</option>
        <option value="true">True</option>
        <option value="false">False</option>
                `
    html += `
        </select>`
        return html
}

module.exports = { drawRead, drawUpdate, drawCreate};