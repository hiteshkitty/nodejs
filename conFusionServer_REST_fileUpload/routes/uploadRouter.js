const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const imageFileFilter = (req, file, callback) => {
    if(!file.originalname.match(/\.(jpg|png|jpeg|gif)$/)){
        return callback(new Error("Only image files are allowed to upload"));
    }
    callback(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get((req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(upload.single('imageFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});

module.exports = uploadRouter;