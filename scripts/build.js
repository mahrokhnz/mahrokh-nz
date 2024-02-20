const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// babel src/lang -d docs/lang && babel src/assets -d docs/assets --copy-files && babel src/index.html -d docs --copy-files

const docsDir = path.resolve(process.cwd(), './docs');
const srcDir = path.resolve(process.cwd(), './src');

// make a clean docs directory
if (fs.existsSync(docsDir)) {
    fs.rmSync(docsDir, { recursive: true });
}

fs.mkdirSync(docsDir);

// run babel
execSync('babel src -d docs -x ".js,.ts"');

// run sass
execSync('sass src/sass/style.sass:docs/styles/style.css');

// copy files
// copy assets
fs.cpSync(
    path.resolve(srcDir, 'assets'),
    path.resolve(docsDir, 'assets'),
    { recursive: true }
);

fs.cpSync(
    path.resolve(srcDir, 'lang'),
    path.resolve(docsDir, 'lang'),
    { recursive: true }
);

fs.cpSync(
    path.resolve(srcDir, 'styles'),
    path.resolve(docsDir, 'styles'),
    { recursive: true }
);

// fix html

const regexFixer = (data, match) => {
    data = data.replace(match, `.js`)
}

fs.readFile('src/index.html', 'utf8', (err, data) => {
    const scriptsRegex = /\.ts/gm
    const match = scriptsRegex.exec(data)
    fixer(data, match)

    console.log(data)
})