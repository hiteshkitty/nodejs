const http = require("http");

const hostname = "localhost";
const port = "8080";

const server = http.createServer((req, res) => {
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type', "text/html");
    res.end("<html><header></header><body>Hello Node example!!!</body></html>");
});
server.listen(port, hostname, () => {
    console.log('server is running..');
 });