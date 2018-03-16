import socketIo from 'socket.io'
import { logger } from './logger'

export class Api {
  private socket: socketIo.Socket

  constructor(socket: socketIo.Socket) {
    this.socket = socket
  }

  public dispatch(): void {
    this.socket.on('version', () => {
      logger.debug('GET version')
      const version = require('../package.json').version
      this.socket.emit('version', version)
    })
  }
}
