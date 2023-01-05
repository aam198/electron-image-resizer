const { contextBridge, ipcRenderer } = require('electron')
const os = require('os');
const path = require('path');
const Toastify = require('toastify-js')

// Connecting Renderer to Node to show output path of resized photo

// To access node inbuilt method to get the path 
contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir()
});

contextBridge.exposeInMainWorld('path', {
  // Taking in arguments
  join: (...args) => path.join(...args)
});

// When using in render Toastify.toast 
contextBridge.exposeInMainWorld('Toastify', {
  toast: (options) => Toastify(options).showToast(),
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)), 
});

// Example of checking node version in renderer.js
// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
  // we can also expose variables, not just functions
// })