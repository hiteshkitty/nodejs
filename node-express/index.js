const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');


const hostName = "localhost";
const port = 8080;

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use('/dishes', dishRouter);

app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><body> This is an Express Server</body></html>");

});

const server = http.createServer(app);

server.listen(port, hostName, ()=> {
    console.log("This is the server running at 8080");
});

