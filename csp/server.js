const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer(function (request, response) {
  console.log('request url', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync(path.resolve(__dirname, 'test.html'), 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html',
      // 'Content-Security-Policy': 'script-src \'self\'; form-action \'self\'; report-uri /report'
    })
    response.end(html)
  } else {
    response.writeHead(200, {
      'Content-Type': 'application/javascript'
    })
    response.end('console.log("loaded script")')
  }
}).listen(8888)

console.log('server listening on 8888')