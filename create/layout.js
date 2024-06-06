import { readFileSync } from 'fs';
import path from 'path';

const htmlPath = path.join(path.resolve(),'create', 'index.html')
let html = readFileSync(htmlPath, 'utf-8')

export function layoutAdd(title, content){
return html.replace('#title#', title).replace('#content#', content)
}