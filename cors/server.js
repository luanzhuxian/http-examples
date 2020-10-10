const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  // 若不设置 urf8 编码，就会读取二进制格式，无法以字符串的形式返回
  const html = fs.readFileSync(path.resolve(__dirname, 'test.html'), 'utf8')

// console.log('path.resolve(__dirname, test.html)', path.resolve(__dirname, 'test.html'))
// console.log('path.join(__dirname, test.html)', path.join(__dirname, 'test.html'))
// console.log('path.resolve(__dirname, /cors/test.html)', path.resolve(__dirname, '/cors/test.html'))
// console.log('path.join(__dirname, /cors/test.html)', path.join(__dirname, '/cors/test.html'))

  // 若不设置 text/html，浏览器就会把返回当成纯文本
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  response.end(html)
}).listen(8888)

console.log('server listening on 8888')