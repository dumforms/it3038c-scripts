# Lab 7 Instructions

Here is how to set up a basic NodeJS web server that uses built-in modules to parse the url and serve files.

Start by creating 3 files: a fileserver.js file for the NodeJS code, and two HTML files to serve as content. All three files should be in the same directory.
On Linux, the commands will look something like this:

```bash
touch fileserver.js
touch content1.html
touch content2.html
```

Put some basic HTML in each file so that you can tell them apart:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Content File 1</h1>
    <p>Content is the best!</p>
  </body>
</html>
```

On to the fileserver. The server will need the HTTP, URL, and File System modules.
All three of these modules are included with Node by default, so they don't have to be imported using NPM.
Simply start the fileserver.js file with the usual requirement statements:

```node
var http = require('http');
var url = require('url');
var fs = require('fs');
```

The first step is to use the HTTP module to create a server and set it to listen on a port, like 8080:

```node
http.createServer((req, res) => {
  //server logic goes here
}).listen(8080);
```

The "req" variable passed into the server includes a "url" field, which can be parsed by the URL module.
The output of parsing the URL is an object with several fields, such as the "host," "pathname," and "search."
The "pathname" is what the server needs in order to find the requested file.
Use the following code inside the createServer() function to parse the URL and assign the "pathname" to a variable:

```node
var query = url.parse(req.url, true);
var filename = "." + query.pathname;
```

Finally, use the File System module to read the requested HTML file and serve it to the client.
It might be a good idea to catch any errors (maybe the file requested doesn't exist) and display an appropriate error message:

```node
fs.readFile(filename, (err, data) => {
  if(err) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end("404 Not Found");
  }
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  return res.end();
});
```

When everything is put together, the fileserver.js code should look something like this:

```node
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
```
Back in the command line, start the server by running the file:

```bash
node fileserver.js
```

Use a browser to connect to "http://localhost:8080/content1.html" and you should see the message from that file appear in your browser.
Changing the URL to "http://localhost:8080/content2.html" should change the content to the other file.
Using an address that doesn't exist, like "http://localhost:8080/foobar.html" should display the 404 error message.

Now you know how to use the HTTP, URL, and File System built-in modules to display website files in NodeJS!
