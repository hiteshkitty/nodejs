const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
const mongoose = require('mongoose');
const Dishes = require('../models/leaders');

leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
    .get((req, res, next) => {
        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                res.json(leaders);
            }, (err) => {
                console.log(err);
            })
            .catch((err) => {
                console.log((err) => next(err));
            });
    })
    .post((req, res, next) => {
        leaders.create(req.body)
            .then((leader) => {
                console.log("leader created: " + leader.name);
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                res.json(leader);
            }, (err) => {
                console.log(err);
            })
            .catch((err) => {
                console.log((err) => next(err));
            });
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete((req, res, next) => {
        leaders.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        leaders.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })
    .put((req, res, next) => {
        leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        leaders.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

    leaderRouter.route('/:leaderId/comments')
.get((req,res,next) => {
    leaders.findById(req.params.leaderId)
    .then((leader) => {
        if (leader != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader.comments);
        }
        else {
            err = new Error('leader ' + req.params.leaderId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    leaders.findById(req.params.leaderId)
    .then((leader) => {
        if (leader != null) {
            leader.comments.push(req.body);
            leader.save()
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);                
            }, (err) => next(err));
        }
        else {
            err = new Error('leader ' + req.params.leaderId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders/'
        + req.params.leaderId + '/comments');
})
.delete((req, res, next) => {
    leaders.findById(req.params.leaderId)
    .then((leader) => {
        if (leader != null) {
            for (var i = (leader.comments.length -1); i >= 0; i--) {
                leader.comments.id(leader.comments[i]._id).remove();
            }
            leader.save()
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);                
            }, (err) => next(err));
        }
        else {
            err = new Error('leader ' + req.params.leaderId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

leaderRouter.route('/:leaderId/comments/:commentId')
.get((req,res,next) => {
    leaders.findById(req.params.leaderId)
    .then((leader) => {
        if (leader != null && leader.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader.comments.id(req.params.commentId));
        }
        else if (leader == null) {
            err = new Error('leader ' + req.params.leaderId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId
        + '/comments/' + req.params.commentId);
})
.put((req, res, next) => {
    leaders.findById(req.params.leaderId)
    .then((leader) => {
        if (leader != null && leader.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                leader.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                leader.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            leader.save()
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);                
            }, (err) => next(err));
        }
        else if (leader == null) {
            err = new Error('leader ' + req.params.leaderId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    leaders.findById(req.params.leaderId)
    .then((leader) => {
        if (leader != null && leader.comments.id(req.params.commentId) != null) {
            leader.comments.id(req.params.commentId).remove();
            leader.save()
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);                
            }, (err) => next(err));
        }
        else if (leader == null) {
            err = new Error('leader ' + req.params.leaderId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = leaderRouter;