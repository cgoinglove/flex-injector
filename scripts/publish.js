const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const rootPath = process.cwd();
const packagePath = path.join(rootPath, 'main');
const packageJsonPath = path.join(packagePath, 'package.json');
const readmeSourcePath = path.join(rootPath, 'README.md');
const readmeDestinationPath = path.join(packagePath, 'README.md');

const PUBLISH_NAME = 'flex-injector';
let ORIGIN_NAME = '';
(async () => {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    ORIGIN_NAME = packageJson.name;

    packageJson.name = PUBLISH_NAME;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Updated package name to "flex-injector".');

    if (fs.existsSync(readmeSourcePath)) {
      fs.copyFileSync(readmeSourcePath, readmeDestinationPath);
      console.log('Copied README.md to main directory.');
    } else {
      console.warn('No README.md found in root directory.');
    }

    console.log('Publishing package...');

    execSync('npm publish', { stdio: 'inherit', cwd: packagePath });
    packageJson.name = ORIGIN_NAME;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`Reverted package name to "${ORIGIN_NAME}".`);
  } catch (error) {
    console.error('Error during publish process:', error);

    if (fs.existsSync(packageJsonPath) && ORIGIN_NAME) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      packageJson.name = ORIGIN_NAME;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('Restored package name to "root" after error.');
    }
  } finally {
    if (fs.existsSync(readmeDestinationPath)) {
      fs.unlinkSync(readmeDestinationPath);
      console.log('Removed README.md from main directory.');
    }
  }
})();
