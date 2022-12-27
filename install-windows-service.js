const { cwd } = require('process');
const appRoot = cwd();
const { join } = require('path');
const filePath = join(appRoot, 'index.js');
var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name: 'Node application as Windows Service',
  description: 'Node application as Windows Service',
  script: filePath
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
  svc.start();
  console.log('Install complete.');
});

svc.install();