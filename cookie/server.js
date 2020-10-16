const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer(function (request, response) {
  console.log('request url', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync(path.resolve(__dirname, 'test.html'), 'utf8')

    if (request.headers.host === 'test.com') {
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Set-Cookie': ['id=123; max-age=2', 'age=666;domain=test.com']
        })
    } else {
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Set-Cookie': ['id=123; max-age=2', 'age=456;domain=test.com', 'sex=789;HttpOnly']
        })
    }
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Set-Cookie': ['id=123; max-age=2', 'age=456;domain=test.com', 'sex=789;HttpOnly']
    })
    response.end(html)
  }

}).listen(8888)

console.log('server listening on 8888')