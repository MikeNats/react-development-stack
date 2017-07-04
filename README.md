# React Development Stack

* React
* Foundation sites
* Unit tests: jasmine, jest
* e2e tests: cucumber, gherkins, webdriverIO, chai


## Installation:

```bash
    $ git clone https://github.com/MikeNats/react-development-stack.git

    $ cd react-development-stack

    $ npm install
```

## How to use:

### To build on development mode. 

Generates a minified version with source map.

```bash
    $ npm run build:dev
```

### To build on production mode.

Compiles all the script from `src` path to `bundle`. The kit generates source maps by default in development mode.

```bash
    $ npm run build
```

### To use webpack dev server & watch,

```bash
    $ npm start
```

Listens at [http://localhost:8080](http://localhost:8080)

## Test:

To run unit tests

```bash
    $ npm test:unit
```

To run e2e tests

```bash
    $ npm test:e2e
```
