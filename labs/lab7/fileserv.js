//require http, url, and file system modules
var http = require('http');
var url = require('url');
var fs = require('fs');

//create and initialize http server on port 8080
http.createServer((req, res) => {
    //parse url for file queries
    var query = url.parse(req.url, true);
    var filename = "." + query.pathname;

    //attempt to read the queried filename and return the requested file
    //if error, throw 404 Not Found
    fs.readFile(filename, (err, data) => {
        if(err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);