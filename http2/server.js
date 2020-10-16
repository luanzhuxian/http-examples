const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer(function (request, response) {
  console.log('request url', request.url)

  const html = fs.readFileSync(path.resolve(__dirname, 'test.html'), 'utf8')
  const img = fs.readFileSync(path.resolve(__dirname, 'test.jpg'))
  if (request.url === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Connection': 'keep-alive',
      'Link': '</test.jpg>; as=image; rel=preload'  // 服务端推送
    })
    response.end(html)
  } else {
    response.writeHead(200, {
      'Content-Type': 'image/jpg',
      'Connection': 'keep-alive' // or close
    })
    response.end(img)
  }

}).listen(8888)

console.log('server listening on 8888')