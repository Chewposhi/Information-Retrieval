# Instruction for running the frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Before everything

Install:

### `node.js`

Download latest version of node.js from [https://nodejs.org/en/]

## Starting the project

### Starting the react application

Open terminal, cd to frontend, run 'npm start'. THe website should be started in your browser. If modules are missing, refer to troubleshoot below.

### Starting json server

json server is a mock server tool that allows simulation of api fetch. To test the fetching in the frontend, open a new terminal, run 'npx json-server --watch src/Data/db.json --port 8000'. The file 'db.json' will be acting as a mock database.

## Installing dependency

### `npm install`

The dependencies used by the project will by default not pushed to thge repo, all neccessary dependencies(library, packages, etc) are documented by the package-lock.json file in the drontend folder.

Therefore, when you are working on a branch that might have dependencies used by other developers, you need to install the missing dependencies.

To install missing dependencies, open terminal, cd to the frontend folder and run 'npm install'. required dependencies should be installed, you can ignore warnings by npm.

### Troubleshoot

Many errors in react can be caused by corrupted or dependencies. One way to troubleshoot is to delete the node_modules folder in the frontend directory and run 'npm install' to reinstall the folder. Most problems can be solved by this method.

## Reference

A good tutorial that includes everything you need to know about react.js :[https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d]

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
