const http = require("http");
const fs = require("fs");
const os = require("os");
const ip = require("ip");

const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        fs.readFile("./public/index.html", "UTF-8", (err, body) => {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(body);
        });
    } else if (req.url.match("/sysinfo")){
        myHostname = os.hostname();
        totalMemoryMB = (os.totalmem() / 1000000);
        freememoryMB = (os.freemem() / 1000000);
        totalUptime = os.uptime();
        uptimeDays = Math.floor(totalUptime / 86400);
        uptimeHours = Math.floor((totalUptime % 86400) / 3600);
        uptimeMinutes = Math.floor(((totalUptime % 86400) % 3600) / 60);
        uptimeSeconds = Math.floor(((totalUptime % 86400) % 3600) % 60);

        html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Node JS Response</title>
          </head>
          <body>
            <p>Hostname: ${myHostname}</p>
            <p>IP: ${ip.address()}</p>
            <p>Server Uptime: Days:${uptimeDays}, Hours:${uptimeHours}, Minutes:${uptimeMinutes}, Seconds:${uptimeSeconds} </p>
            <p>Total Memory: ${totalMemoryMB} MB</p>
            <p>Free Memory: ${freememoryMB} MB</p>
            <p>Number of CPU Cores: ${os.cpus().length}</p>
          </body>
        </html>`
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end(`404 File Not Found at ${req.url}`);
    }
}).listen(port)

console.log(`Server listening on port ${port}`);