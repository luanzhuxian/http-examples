const http = require('http')

http.createServer(function (request, response) {
  console.log('request url', request.url)

  if (request.url === '/') {
    response.writeHead(301, {  // 永久变更
      'Location': '/new'    // 告诉浏览器新的资源在哪
    })
    // response.writeHead(302, {  // 临时变更
    //   'Location': '/new'    // 告诉浏览器新的资源在哪
    // })
    response.end()
  }

  if (request.url === '/new') {
    response.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8',
    })
    response.end('<div>被你发现啦~~</div>')
  }
}).listen(8888)

console.log('server listening on 8888')