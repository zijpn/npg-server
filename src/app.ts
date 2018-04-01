import express from 'express'
import { createServer, Server } from 'http'
import path from 'path'
import socketIo from 'socket.io'
import { Api } from './api'
import { logger, MemLogger } from './logger'

export class App {
  public app: express.Application
  public server: Server
  public io: socketIo.Server
  private port: string | number

  constructor() {
    this.app = express()
    this.server = createServer(this.app)
    this.io = socketIo(this.server, {
      path: '/api',
    })
    this.port = process.env.PORT || 8080
    this.config()
    this.listen()
  }

  private config(): void {
    const root = path.join(__dirname, '../public')
    this.app.use(express.static(root))
    this.app.all('*', (req, res) => {
      res.sendFile('index.html', { root })
    })
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      logger.info(`Server listening on port ${this.port}`)
    })
    this.io.sockets.on('connect', (socket) => {
      logger.info('Client connected')

      const memLogger = logger.transports.mem as MemLogger
      socket.emit('log', memLogger.archive)
      memLogger.on('log', (log) => {
        socket.emit('log', [log])
      })

      const api = new Api(socket)
      api.dispatch()

      socket.on('disconnect', () => {
        logger.info('Client disconnect')
        memLogger.removeAllListeners('log')
      })
    })
  }
}
