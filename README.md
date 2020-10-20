This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites
- [Node](https://www.npmjs.com/get-npm) or [Yarn](https://classic.yarnpkg.com/en/docs/install)

## Getting started

```bash
$ git clone git@github.com:ros-tooling/ros-tooling.github.io.git
$ cd ros-tooling.github.io
$ git checkout master
```

## Running Locally

```bash
# Install the dependencies
$ yarn install
# Run the web app locally
$ yarn start
```

Checkout [`packages.json`](https://github.com/ros-tooling/ros-tooling.github.io/blob/master/package.json#L16) for other scripts that are available.

## Deploying to Github

```bash
# Create an optimized build for production
$ yarn build 
# Deploy the contents of build into the gh-pages branch of this repo
$ yarn deploy
```
