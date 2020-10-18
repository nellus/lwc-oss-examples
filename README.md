# lwc-oss-router

**IN DEVELOPMENT**

simple router for oss lwc

## How to start?

To get started run `npm install lwc-oss-router`.

After that add `{"npm": "lwc-oss-router"}` as new object in modules array in lwc.config.json

**NB:** This does not work in local development server, you need to build up the lwc app and then use the command `npm run serve`

## components

**my-router**

the main container. Can contain all the route.

`<my-router></my-router>`

**props**

N/D

**my-route**

define a slot for a specific route

`<my-route></my-route>`

**props**

**`path`** the path that will match with the url and show whats inside the route

**my-link**

define a slot to insert a component that will cause a redirect

**props**

**`to`** the path that will redirect to

## How to use it

TBD

<!-- Start simple by running `yarn watch` (or `npm run watch`, if you set up the project with `npm`). This will start the project with a local development server.

The source files are located in the [`src`](./src) folder. All web components are within the [`src/client/modules`](./src/modules) folder. The folder hierarchy also represents the naming structure of the web components. The entry file for the custom Express configuration can be found in the ['src/server'](./src/server) folder.

Find more information on the main repo on [GitHub](https://github.com/muenzpraeger/create-lwc-app). -->
