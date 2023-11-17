// @ts-check
const fs = require('node:fs');

function loadModule(/** @type {string} */ name) {
  try {
    return require(name);
  } catch (e) {
    return undefined;
  }
}

function switchVersion(/** @type { 2 | 3 } */ version) {
  fs.rmSync('./dist/vue-current', { recursive: true, force: true });
  fs.cpSync(`./dist/vue${version}`, './dist/vue-current', { recursive: true });
}

const Vue = loadModule('vue');

if (!fs.existsSync('./dist')) {
  console.log('dist not exists');
} else if (!Vue || typeof Vue.version !== 'string') {
  console.warn(
    '[component-library] Vue is not found. Please run "npm install vue" to install.',
  );
} else if (Vue.version.startsWith('2.')) {
  switchVersion(2);
} else if (Vue.version.startsWith('3.')) {
  switchVersion(3);
} else {
  console.warn(
    `[component-library] Vue version v${Vue.version} is not suppported.`,
  );
}
