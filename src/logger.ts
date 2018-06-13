import { createLogger, format, transports } from 'winston'
import Transport from 'winston-transport'

export const maxlog = 500

export class MemLogger extends Transport {
  // storage back-end
  public archive: Array<{ timestamp: Date, level: string, msg: string }>

  constructor() {
    super()
    this.archive = []
  }

  public log(info: any, callback: () => void) {
    // store this message
    const entry = {
      level: info.level,
      msg: info.message,
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
    callback()
  }
}

const tp: Transport[] = [
  new MemLogger(),
]

if (process.env.NODE_ENV !== 'test') {
  tp.push(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
    ),
  }))
}

export const logger = createLogger({
  exitOnError: false,
  level: 'debug',
  transports: tp,
})
