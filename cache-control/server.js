const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer(function (request, response) {
  console.log('request url', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync(path.resolve(__dirname, 'test.html'), 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(html)
  }

  if (request.url === '/script.js') {
    response.writeHead(200, {
      'Content-Type': 'text/javascript',
      'Cache-Control': 'max-age=200, public'
    })
    response.end('console.log("script loaded")')
  }

  // 304
  if (request.url === '/script3.js') {
      const etag = request.headers['if-none-match']
      if (etag === 'asdsadsaasd') {
        response.writeHead(304, {
            'Content-Type': 'text/javascript',
            'Cache-Control': 'max-age=20',
            'Last-Modified': '123456',
            'Etag': 'asdsadsaasd'
          })
          response.end('')
      } else {
        response.writeHead(200, {
            'Content-Type': 'text/javascript',
            'Cache-Control': 'max-age=20000, no-cache',
            'Last-Modified': '123456',
            'Etag': 'asdsadsaasd'
          })
          response.end('console.log("script 2 loaded")')
      }

  }
}).listen(8888)

console.log('server listening on 8888')