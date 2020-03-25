import app from './app'
import http from 'http'

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)

server.listen(port)
server.on('listening', onListening)

function onListening() {
  const addr = server.address()
  if (!addr) return
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.log('[@] Complete.')
  console.log('[@] port: ' + bind)
}

function normalizePort(val: string) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}
