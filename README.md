# hibp-client

This React/Redux/NodeJS/Express client application for the Have I been Pwned API.

## Setup
### Prequisities
- Node 10.15.0 (Tested)
- Yarn
### Install Dependencies
```
yarn
```

### Start Development Environment
```
yarn run watch
```
Open http://localhost:4000 in a web browser to view the application.

### Start Development Environment with Hot loading React App
```
yarn run watch:hot
```
Open http://localhost:3000 in a web browser to view the application.

### Building the React App
```
yarn run build:react
```

### Starting the application
```
yarn run start
```
Open http://localhost:4000 in a web browser to view the application.

Please note that you should build the React before starting the Node server.

## Test Suite
Running the test suite:
```
yarn run test
```
You can also run the test suite with a watch running:
```
yarn run test:watch
```

The unit test suite coverage is currently incomplete with the current code in /test directory. It was intended to cover the server side code, Redux reducers and React components with a test driven development approach. Sadly this was dropped due to time constraints with only the Basic view (http://localhost:4000/test) having reducer and component coverage. However the HIBP API client classes have test coverage.

## ToDos
- Delint codebase - unfortunately automatic linting was not running in the editor used for development. At linting profile and script exist however this process has not been completed due to lack of time for retesting the resulting refactored code.
- Implement unit testing for all Redux Reducers and React Components
- Add registration page
- Add Login page
- Add password reset page
- Session management using [express-session](https://github.com/expressjs/session) - This would include persisting the user's last search term to allow for rexecution of searches upon refreshing the page.
- Authentication using simple custom class backed by a [LowDB](https://github.com/typicode/lowdb) database.