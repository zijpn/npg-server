import { LogCallback, Logger, LoggerInstance, Transport, TransportInstance, transports } from 'winston'

export const maxlog = 500

export class MemLogger extends Transport {
  // storage back-end
  public archive: Array<{ timestamp: Date, level: string, msg: string }>

  constructor() {
    super()
    this.name = 'mem'
    this.level = 'debug'
    this.archive = []
  }

  public log(level: string, msg: string, meta: any, callback: LogCallback) {
    // store this message
    const entry = {
      level,
      msg,
      timestamp: new Date(),
    }
    this.archive.push(entry)
    // we don't want our archive to grow too large
    if (this.archive.length > maxlog) {
      this.archive.splice(0, this.archive.length - maxlog)
    }
    // emit event
    this.emit('log', entry)
    // callback indicating success
    callback(null)
  }
}

const tp: TransportInstance[] = [
  new MemLogger(),
]

if (process.env.NODE_ENV !== 'test') {
  tp.push(new transports.Console({
    colorize: true,
    timestamp: () => new Date().toLocaleString(),
  }))
}

export const logger: LoggerInstance = new Logger({
  exitOnError: false,
  level: 'debug',
  transports: tp,
})
