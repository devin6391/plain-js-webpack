# Plain JavaScript Webpack application
This application is based on the theory described in [this article](https://www.codementor.io/vineetdev/how-to-effectively-develop-vanilla-javascript-application-5k19c0ct9).
The idea is to use good build tools and compilers with latest but core javascript/frontend technologies like ES6, Fetch and service workers. With this idea, make a component based plain javascript application with PWA approach.

### Steps to use this repo
* This repo is more of a style guide on how to make vanilla js app. But you can see the source code to get an idea over how to develop such apps.
* You would need node > v6 on your system.
* Please install yarn globally. eg - npm i -g yarn.
* Install packages with yarn. eg - yarn install.
* If you are adding your own packages then use yarn to add them. eg - yarn add "npm package"
* The mock data and mock routes are defined in mock-data.json and mock-routes.json. You can check that by runnin command "npm run serve:mock", and check with url - localhost:3004.
* After installing everything you need to run command "npm start" in your terminal and you can see that both webpack dev server and json-server running simultaneously.
* Then you can open your app on address - "localhost:3000".
* To make distributable code for production you need to run command - "npm run build".
* To check your distributable code, run command - "npm serve:prod". After this go to address - "localhost:8080" on your browser.
* Service worker for caching your application and making it offline is installed only for production build.
* Service worker will cache all your files (including initial index.html). But when you form a new build, the service worker will get updated in background. For more information over how lifecycle of service worker please read [this google developer article](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers). And please go through [git repo of sw-precache](https://github.com/GoogleChrome/sw-precache) to know more about how to generate a service worker to cache your files on browser
* Please use ES6 code as much as possible, promises and always use [fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) instead of xhr/ajax. You can use [fetch-ponyfill npm module](https://github.com/qubyte/fetch-ponyfill) for getting polyfill for fetch.

### Technologies Used
* ES6 with babel.
* Webpack as build tool.
* Service worker for precaching. Google Chrome's "sw-precache" module is used.
* Fetch - with fetch-ponyfill.
* EJS - compiling html with EJS templating system.
* UglifyJS2 is being used with #harmony so that ES6 can be uglified.
* For mocking data and http calls, "json-server" is being used.
* For development, webpack-dev-server is being used.

## Please contribute
I believe that we don't need to use javascript frameworks or even heavy libraries for making small apps. Apps like - authentication app, simple presentation app, even chatting apps - can be built easily with plain javascript.

So, I would request everyone to contribute in this and make this approach simple and feasible for everyone.
