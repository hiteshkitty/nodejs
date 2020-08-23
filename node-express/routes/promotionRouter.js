const express = require('express');
const bodyParser = require('body-parser');
const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get( (req, res, next) => {
    res.end("We will send you the promotions" + req.params.promotionId );
})
.post( (req, res, next) => {
    res.statusCode = 201;
    res.end("We will create your promotions");
})
.put( (req, res, next) => {
    res.statusCode = 200;
    res.end("We will update your promotions");
})
.delete( (req, res, next) => {
    res.statusCode = 204;
    res.end("We will delete your promotions");
});

promotionRouter.route('/:promotionId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get( (req, res, next) => {
    res.end("We will send you the promotions for " + req.params.promotionId );
})
.post( (req, res, next) => {
    res.statusCode = 201;
    res.end("We will create your promotions for " + req.params.promotionId );
})
.put( (req, res, next) => {
    res.statusCode = 200;
    res.end("We will update your promotions for " + req.params.promotionId );
})
.delete( (req, res, next) => {
    res.statusCode = 204;
    res.end("We will delete your promotions for " + req.params.promotionId );
});

module.exports = promotionRouter;