const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const lockPath = path.join(root, 'package-lock.json');
const p = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
const pkgs = p.packages || {};

function pkgName(k) {
  if (k === '') return 'ROOT';
  try {
    return require(path.join(root, k, 'package.json')).name;
  } catch {
    return null;
  }
}

const names = Object.keys(pkgs).map(pkgName);
const miaoda = names.filter((n) => n && /miaoda/i.test(n));
const rootDeps = p.packages[''] && p.packages[''].dependencies;
const rootDevDeps = p.packages[''] && p.packages[''].devDependencies;

console.log('Total package entries:', names.length);
console.log('Miaoda entries remaining:', miaoda.length ? miaoda.join(', ') : 'NONE');
console.log('Root dependencies:', rootDeps ? Object.keys(rootDeps).join(', ') : '(none)');
console.log('Root devDependencies:', rootDevDeps ? Object.keys(rootDevDeps).join(', ') : '(none)');

// Assert clean
if (miaoda.length > 0) {
  console.error('FAILED: Miaoda entries still present');
  process.exit(1);
}
if (!rootDevDeps || !rootDevDeps.vite) {
  console.error('FAILED: vite missing from devDependencies');
  process.exit(1);
}
console.log('OK: package-lock.json is clean.');
