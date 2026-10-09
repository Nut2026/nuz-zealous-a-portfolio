const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const lockPath = path.join(root, 'package-lock.json');

const p = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
const pkgs = p.packages || {};

// 1. Remove from root dependencies
delete p.packages[''].dependencies['miaoda-react-devkit'];

// 2. Determine which package entries to remove
const toRemove = new Set();
Object.keys(pkgs).forEach((k) => {
  if (k === '') return;
  let name;
  try {
    name = require(path.join(root, k, 'package.json'))?.name;
  } catch {
    return;
  }
  if (name === 'miaoda-react-devkit' || /^miaoda/i.test(name)) {
    toRemove.add(k);
  }
});

// 3. Clean up dependency references pointing to removed packages
Object.keys(pkgs).forEach((k) => {
  if (toRemove.has(k)) return;
  const deps = pkgs[k].dependencies || {};
  for (const dep of Object.keys(deps)) {
    if (toRemove.has('node_modules/' + dep)) {
      delete deps[dep];
      if (Object.keys(deps).length === 0) {
        delete pkgs[k].dependencies;
      }
    }
  }
});

// 4. Delete the entries
toRemove.forEach((k) => delete pkgs[k]);

fs.writeFileSync(lockPath, JSON.stringify(p, ' ', 2) + '\n');

// Report
console.log('Done. package-lock.json updated.');
console.log('Root dependencies:');
console.log(JSON.stringify(p.packages[''].dependencies, null, 2));
console.log('Remaining packages:', Object.keys(pkgs).length);
console.log('Miaoda entries remaining:', Object.keys(pkgs).filter((k) => /miaoda/i.test(k)).join('\n') || 'none');
