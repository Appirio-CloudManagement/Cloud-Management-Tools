# Getting Started with Cloud Management Dashboard

A barebones Node.js app using [Express 4](http://expressjs.com/).

Built for [Heroku Buildpack for Node.js](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs) Check out the [Getting Started on Heroku Node JS](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed. 

```sh
$ git clone https://github.com/Appirio-CloudManagement/Cloud-Management-Tools.git # or clone your 
$ cd Cloud-Management-Tools
$ npm install jsforce-ajax-proxy --save
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
