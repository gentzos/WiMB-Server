/**
 * Created by Daniel on 4/22/2016.
 */
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
}).listen(4000);
console.log('Server running at http://localhost:4000/');