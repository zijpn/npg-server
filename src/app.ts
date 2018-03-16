import express from 'express'
import { createServer, Server } from 'http'
import path from 'path'
import socketIo from 'socket.io'
import { Api } from './api'
import { logger } from './logger'

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
    this.port = process.env.PORT || 3000
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
      logger.info('Socket connected')
      const api = new Api(socket)
      api.dispatch()
      socket.on('disconnect', () => {
        logger.info('Socket disconnected')
      })
    })
  }
}
