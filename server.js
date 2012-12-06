var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    var path = 'src' + req.url;
    fs.readFile(path, 'utf8', function(err, data) {
        if (data === undefined) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(fs.readFileSync('src/index.html'));
        } else {
            res.writeHead(200, {'Content-Type': getContentType(path)});
            res.end(data);
        }
    });
}).listen(process.env.PORT);

var getContentType = function(file) {
    switch (true) {
        case /\.css$/.test(file):
            return 'text/css';
        case /\.html$/.test(file):
            return 'text/html';
        case /\.js$/.test(file):
            return 'application/javascript';
        default:
            return 'text/plain';
    }
};