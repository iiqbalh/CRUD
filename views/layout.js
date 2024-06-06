import { readFileSync } from 'fs';
import path from 'path';

const htmlPath = path.join(path.resolve(),'views', 'index.html')
let html = readFileSync(htmlPath, 'utf-8')

export function layout(title, content){
return html.replace('#title#', title).replace('#content#', content)
}