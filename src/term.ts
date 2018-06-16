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

  public create(cols: number = 80, rows: number = 24, backend: string = '', container: string = '') {
    let args: string[] = []
    if (container) {
      args = ['-c', `docker exec -it ${container} /usr/bin/env TERM=$TERM /bin/bash`]
    } else if (backend) {
      args = ['-c', `docker-machine ssh ${backend}`]
    }
    const term = spawn(process.env.SHELL, args, {
      cols,
      cwd: process.env.HOME,
      name: 'xterm',
      rows,
    })
    const id = term.pid
    this.terms[id] = term
    term.on('data', (data) => this.onData(id, data))
    term.on('close', () => this.onClose(id))
    logger.info(`Created term ${id}`)
    this.socket.emit('created', {
      backend,
      container,
      id,
      process: process.env.SHELL,
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
      logger.debug(`Resize term ${id} to ${cols}x${rows}`)
      this.terms[id].resize(cols, rows)
    }
  }

  private onData(id: number, data: any) {
    this.socket.emit('data', {
      data,
      id,
    })
  }

  private onClose(id: number) {
    // Make sure it closes on the client side
    this.socket.emit('close', { id })
    // Ensure removal
    Reflect.deleteProperty(this.terms, id)
    logger.info(`Closed term ${id}`)
  }
}
