import socketIo from 'socket.io'
import { logger, MemLogger } from './logger'
import { Term } from './term'

export class Api {

  public dispatch(io: socketIo.Server): void {
    const ioLog = io.of('/log')
    ioLog.on('connection', (socket) => this.logHandler(socket))

    const ioTerm = io.of('/term')
    ioTerm.on('connection', (socket) => this.termHandler(socket))

    const ioServer = io.of('/server')
    ioServer.on('connection', (socket) => this.serverHandler(socket))
  }

  private logHandler(socket: socketIo.Socket) {
    const memLogger = logger.transports.mem as MemLogger
    socket.emit('log', memLogger.archive)
    memLogger.on('log', (log) => {
      socket.emit('log', [log])
    })
    socket.on('disconnect', () => {
      memLogger.removeAllListeners('log')
    })
  }

  private termHandler(socket: socketIo.Socket) {
    const term = new Term(socket)
    socket.on('create', (msg) => {
      let args: string[] = []
      if (msg.container) {
        args = ['-c', `docker exec -it ${msg.container} /usr/bin/env TERM=$TERM /bin/bash`]
      } else if (process.env.DOCKER_MACHINE_NAME) {
        args = ['-c', `docker-machine ssh ${process.env.DOCKER_MACHINE_NAME}`]
      }
      term.create(msg.cols, msg.rows, args, msg.container)
    })
    socket.on('destroy', (msg) => {
      term.destroy(msg.id)
    })
    socket.on('data', (msg) => {
      term.write(msg.id, msg.data)
    })
    socket.on('resize', (msg) => {
      term.resize(msg.id, msg.cols, msg.rows)
    })
  }

  private serverHandler(socket: socketIo.Socket) {
    logger.debug('GET version')
    const version = require('../package.json').version
    socket.emit('version', version)
  }
}
