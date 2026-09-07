import { writeFileSync } from 'node:fs';
const open = String.fromCharCode(60);
const page = open + 'div id="root">' + open + '/div>\n' + open + 'script type="module" src="/src/main.tsx">' + open + '/script>\n';
writeFileSync('index.html', page);
