const http = require('http')
const querystring = require('querystring')

http.createServer(function (request, response) {
    const [path, query] = request.url.split('?')
    console.info('request url', request.url)

    if (path === '/jsonp' && query) {
        const { callback } = querystring.parse(query)
        response.end(`${callback}(jsonp)`)
    } else {        
        response.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Test-Cors',
            'Access-Control-Allow-Methods': 'POST, PUT, DELETE',
            'Access-Control-Max-Age': '1000'
        })
        response.end('123')
    }

}).listen(8887)

console.log('server listening on 8887')