# Goods Chain Project

Supply chain project based on Ethereum and NodeJS.

## Prerequisites
1. Install NodeJS 8.11.3 and NPM 5.6.0 by using [NVM](https://github.com/creationix/nvm) - Open a new terminal to use nvm
2. Install Angular CLI: `npm install -g @angular/cli --unsafe-perm=true --allow-root`
3. From project root folder install all the dependencies: `npm install --unsafe-perm=true --allow-root`
4. Update your MONGODB_URI and MONGODB_TEST_URI in the .env file

### Install NodeJS 8.11.3 and NPM 5.6.0
1. nvm install 8.11.3
3. nvm use 8.11.3
4. Check NodeJS version: node -v
5. Check npm version: npm -v

## Run
### Development mode
`npm run dev`: [concurrently](https://github.com/kimmobrunfeldt/concurrently) execute MongoDB, Angular build, TypeScript compiler and Express server.

Use your browser with [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

### Production mode
`npm run prod`: run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000)

### Kill project on linux (Development mode)
`sudo kill -9 $(sudo lsof -t -i:4200)`: For front-end when it is running on port 4200.

`sudo kill -9 $(sudo lsof -t -i:3000)`: For back-end when it is running on port 3000.

### Create new component
1. ng generate component <component-name> --module=app.module
2. Add new component to `routing.module`

### Testing
## Running frontend unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running frontend end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `npm start`.

## Running backend tests
Run `mongod` to run an instance of MongoDB, then run `npm run testbe` to execute the backend tests via [Mocha](https://mochajs.org/).

## Running TSLint
Run `ng lint` (frontend) and `npm run lintbe` (backend) to execute the linter via [TSLint](https://palantir.github.io/tslint/).

### Author
* [Nguyen Bao Xuan Truong](https://www.facebook.com/NguyenBaoXuanTruong)