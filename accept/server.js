const http = require('http')
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

http.createServer(function (request, response) {
  console.log('request url', request.url)
  console.log('content-type', request.headers['content-type'])

  const html = fs.readFileSync(path.resolve(__dirname, 'test.html'), 'utf8')

  response.writeHead(200, {
    'Content-Type': 'text/html',
    'X-Content-Options': 'nosniff',
    'Content-Encoding': 'gzip'
  })

  response.end(zlib.gzipSync(html))
//   response.end(html)
}).listen(8888)

console.log('server listening on 8888')