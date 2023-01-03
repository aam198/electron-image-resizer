const { contextBridge } = require('electron')
const os = require('os');
const path = require('path');

// Connecting Renderer to Node to show output path of resized photo

// To access node inbuilt method to get the path 
contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir()
});

contextBridge.exposeInMainWorld('path', {
  // Taking in arguments
  join: (...args) => path.join(...args)
});

// Example of checking node version in renderer.js
// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
  // we can also expose variables, not just functions
// })