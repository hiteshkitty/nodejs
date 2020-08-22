const http = require("http");

const hostname = "localhost";
const port = "8080";

const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log("request for " + req.url + " by method " + req.method);
    res.statusCode = 200;
    res.setHeader('Content-Type', "text/html");
    if (req.method == "GET") {
        var fileurl;
        if (req.url == "/") {
            fileurl = "index.html";
        } else {
            fileurl = req.url;
        }
        console.log("fileurl: " + fileurl);
        var filepath = path.resolve("./public/" + fileurl);
        const fileext = path.extname(filepath);
        console.log("filepath: " + filepath);
        if (fileext == ".html") {
            console.log("html...");
            fs.exists(filepath, (exists) => {
                if (!exists) {
                    console.log("don't exists");
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end("<html><body> 404 error as file doen't exists</body></html>");
                    return;
                } else {
                    res.statusCode = 200;
                    console.log("exits...");
                    res.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(filepath).pipe(res);
                }
            });
        } else {
            console.log("not a html...");
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end("<html><body> 404 error as file doen't exists and not a html</body></html>");
            return;
        }

    } else {
        console.log("Not a GET request");
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end("<html><body> 404 error as file doen't exists and not a GET method</body></html>");
        return;
    }
});
server.listen(port, hostname, () => {
    console.log('server is running..');
});