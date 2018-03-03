import { logger, maxlog, MemLogger } from '../src/logger'
import stdMocks from 'std-mocks'

describe('logger', () => {
  it('memory logger', () => {
    // in test env, we only have one transport
    expect(Object.keys(logger.transports).length).toBe(1)
    expect(logger.transports.mem.name).toMatch('mem')
    expect(logger.transports.mem.level).toMatch('debug')
  })

  it('log message', () => {
    let memlog = logger.transports.mem as MemLogger
    let msg = 'first unit test msg'
    expect(memlog.archive.length).toBe(0)
    logger.info(msg)
    expect(memlog.archive.length).toBe(1)
    expect(memlog.archive[0].timestamp.toISOString()).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    expect(memlog.archive[0].level).toMatch('info')
    expect(memlog.archive[0].msg).toMatch(msg)
  })

  it('maxlog messages', () => {
    let max = maxlog * 2
    for (let i = 0; i < max; i += 1) {
      logger.info(`unit test msg ${i}`)
    }
    let memlog = logger.transports.mem as MemLogger
    expect(memlog.archive.length).toBe(maxlog)
  })

  it('multi transport', () => {
    process.env.NODE_ENV = 'production'
    jest.resetModules()
    const logger = require('../src/logger')
    expect(Object.keys(logger.logger.transports).length).toBe(2)
  })

  it('colorized console', () => {
    let logger = require('../src/logger')
    expect(logger.logger.transports.console.colorize).toBeTruthy()
  })

  it('timestamp', () => {
    let logger = require('../src/logger')
    stdMocks.use()
    logger.logger.info('testje')
    stdMocks.restore()
    const output = stdMocks.flush()
    expect(output.stdout[0]).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
  })
})
