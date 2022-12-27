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

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', function () {
  console.log('Uninstall complete.');
  console.log('The service exists: ', svc.exists);
});

// Uninstall the service.
svc.uninstall();