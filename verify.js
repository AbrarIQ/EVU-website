const fs = require('fs');
const vm = require('vm');

const indexPath = '/Users/shaikhabrarahmed/Desktop/evu-web/index.html';
const content = fs.readFileSync(indexPath, 'utf8');

// Extract script blocks
const scriptReg = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;

console.log('Starting javascript compilation checks...');

while ((match = scriptReg.exec(content)) !== null) {
  const scriptTag = match[0];
  if (scriptTag.toLowerCase().includes('type="application/ld+json"') || scriptTag.toLowerCase().includes("type='application/ld+json'")) {
    continue;
  }
  const code = match[1].trim();
  if (!code) continue;
  count++;
  try {
    new vm.Script(code);
    console.log(`Script block #${count} compiled successfully.`);
  } catch (err) {
    console.error(`Script block #${count} failed compilation!`);
    console.error(err.stack);
    process.exit(1);
  }
}

console.log(`All ${count} script blocks compiled successfully!`);
