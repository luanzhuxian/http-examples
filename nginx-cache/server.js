const http = require('http')
const fs = require('fs')
const path = require('path')

const wait = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000)
    })
}

http.createServer(function (request, response) {
    console.log('request url', request.url)

    if (request.url === '/') {
        const html = fs.readFileSync(path.resolve(__dirname, 'test.html'), 'utf8')
        response.writeHead(200, {
        'Content-Type': 'text/html'
        })
        response.end(html)
    }

    if (request.url === '/data') {
        // 同时设置 max-age 和 s-maxage，代理服务器会读取 s-maxage
        // 不设置 private 的话，浏览器缓存2s，代理服务器的缓存是20s，第一次之后的重复刷新 nginx 会读取缓存并返回
        response.writeHead(200, {
        'Cache-Control': 'max-age=2, s-maxage=20, private',
        'Vary': 'X-Test-Cache'  // 头信息一样才会使用缓存
        })
        wait(2).then(() => response.end('success'))
    }
}).listen(8888)

console.log('server listening on 8888')