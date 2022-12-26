# express-start-winserv

A barebones Node.js app using [Express 4](http://expressjs.com/).

[Installing a node.js application as a Windows service](https://eysermans.com/post/installing-a-node-application-as-a-windows-service) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone https://github.com/bsa-git/express-start-winserv.git # or clone your own fork
$ cd express-start-winserv
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Install a node application as a Windows service

There is a [NPM package node-windows](https://github.com/coreybutler/node-windows) which can install a node application as a Windows service. This service can be automatically started when the server restarts.
This is the `Deploying to Heroku` sample from the [Heroku](https://github.com/heroku/node-js-getting-started.git) website, we will install it as a Windows service:

```js
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
```

The [node-windows NPM package](https://github.com/coreybutler/node-windows) can do this for us. Run the following commands

```sh
npm install -g node-windows
npm link node-windows
```

Once the package is installed it can be used to install the application as a service with the following node script:

```js
var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Node application as Windows Service',
  description: 'Node application as Windows Service',
  script: 'C:\\MyProjects\\NodeServer\\express-start-winserv\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
```

Just run the script as any other node script:

```sh
node install-windows-service.js
```

If User Account Control (UAC) is enabled on Windows you will have to give permission a few times to complete the installation. Once this script has finished the service is installed and the application is running. You can find the service in the `Services` dialog. It will have the name that you have passed to the `Service` class in the node script.

<img alt="Services dialog with the newly installed Windows service" src="https://eysermans.com/images/articles/installing-a-node-application-as-a-windows-service/services.png" style="width:75%;">

If the service ever needs to be uninstalled, the Service class also has an uninstall method:

```js
var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Node application as Windows Service',
  description: 'Node application as Windows Service',
  script: 'C:\\MyProjects\\NodeServer\\express-start-winserv\\index.js'
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

// Uninstall the service.
svc.uninstall();
```

This can also be run as any other node script:

```sh
node uninstall-windows.service.js
```
