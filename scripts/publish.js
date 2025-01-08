const fs = require('fs');
const { execSync } = require('child_process');

const packageJsonPath = './package.json';

const PUBLISH_NAME = 'flex-injector';

try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  const originalName = packageJson.name;

  packageJson.name = PUBLISH_NAME;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('Updated package name to "flex-injector".');

  console.log('Publishing package...');
  execSync('npm publish', { stdio: 'inherit' });

  packageJson.name = originalName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`Reverted package name to "${originalName}".`);
} catch (error) {
  console.error('Error during publish process:', error);
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.name = 'root';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Restored package name to "root" after error.');
  }
  process.exit(1);
}
