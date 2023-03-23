# Instruction for running the frontend

Please take note: in order for the entire project to run, you need to get 3 servers running, the React local development server, solr server and lastly the server.js in the server directory.

This document only explains the steps of starting the React local development server. For the other servers, please refer to the README.md in their respective folders.

## Before everything

### Install:

`node.js`

### Obtain API from Rapid API:

This step is required. Go to Rapid API and sign up. search for IMDb API and subsceibe to the free option. Obtain X-RapidAPI-Key from it and update the environment variable. Steps for updating environment variable is in the file .env.example



Download latest version of node.js from [https://nodejs.org/en/]

## Starting the project

### Starting the react application

Open terminal, cd to frontend, run 'npm start'. The website should be started in your browser. If modules are missing, refer to the next point.


## Installing dependency

### `npm install`

The dependencies used by the project will by default not pushed to thge repo, all neccessary dependencies(library, packages, etc) are documented by the package-lock.json file in the drontend folder.

Therefore, when you are working on a branch that might have dependencies used by other developers, you need to install the missing dependencies.

To install missing dependencies, open terminal, cd to the frontend folder and run 'npm install'. required dependencies should be installed, you can ignore warnings by npm.

run 'npm start' again to start the server.

### Troubleshoot

Many errors in react can be caused by corrupted or dependencies. One way to troubleshoot is to delete the node_modules folder in the frontend directory and run 'npm install' to reinstall the folder. Most problems can be solved by this method.

## Reference

A good tutorial that includes everything you need to know about react.js :[https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d]

