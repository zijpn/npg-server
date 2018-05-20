import { spawn } from 'node-pty'
import { ITerminal } from 'node-pty/lib/interfaces'
import socketIo from 'socket.io'
import { logger } from './logger'

export class Term {
  public socket: socketIo.Socket
  public terms: { [key: number]: ITerminal }

  constructor(socket: socketIo.Socket) {
    this.socket = socket
    this.terms = {}
  }

  public create(cols: number = 80, rows: number = 24, args: string[] = [], container: string = '') {
    const proc = process.env.SHELL
    const term = spawn(proc, args, {
      cols,
      cwd: process.env.HOME,
      name: 'xterm',
      rows,
    })
    const id = term.pid
    this.terms[id] = term
    term.on('data', (data) => {
      this.socket.emit('data', {
        data,
        id,
      })
    })
    term.on('close', () => {
      // Make sure it closes on the client side
      this.socket.emit('close', { id })
      // Ensure removal
      Reflect.deleteProperty(this.terms, id)
      logger.info('Closed term %s', id)
    })
    logger.info('Created term %s', id)
    this.socket.emit('created', {
      container,
      id,
      process: proc,
    })
  }

  public destroy(id: number) {
    if (this.terms[id]) {
      this.terms[id].destroy()
      Reflect.deleteProperty(this.terms, id)
    }
  }

  public write(id: number, data: string) {
    if (this.terms[id]) {
      this.terms[id].write(data)
    }
  }

  public resize(id: number, cols: number, rows: number) {
    if (this.terms[id]) {
      logger.debug('Resize term %s to %dx%d', id, cols, rows)
      this.terms[id].resize(cols, rows)
    }
  }
}
