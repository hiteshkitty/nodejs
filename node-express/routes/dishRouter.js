const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get( (req, res, next) => {
    res.end("We will send you the dishes");
})
.post( (req, res, next) => {
    res.statusCode = 201;
    res.end("We will create your dishes");
})
.put( (req, res, next) => {
    res.statusCode = 200;
    res.end("We will update your dishes");
})
.delete( (req, res, next) => {
    res.statusCode = 204;
    res.end("We will delete your dishes");
});

module.exports = dishRouter;