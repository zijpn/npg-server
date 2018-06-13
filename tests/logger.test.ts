import stdMocks from 'std-mocks'
import { logger, maxlog, MemLogger } from '../src/logger'

describe('logger', () => {
  it('memory logger', () => {
    // in test env, we only have one transport
    expect(Object.keys(logger.transports).length).toBe(1)
  })

  it('log message', () => {
    const memlog = logger.transports[0] as MemLogger
    const msg = 'first unit test msg'
    expect(memlog.archive.length).toBe(0)
    logger.info(msg)
    expect(memlog.archive.length).toBe(1)
    expect(memlog.archive[0].timestamp.toISOString()).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    expect(memlog.archive[0].level).toMatch('info')
    expect(memlog.archive[0].msg).toMatch(msg)
  })

  it('maxlog messages', () => {
    const memlog = logger.transports[0] as MemLogger
    const max = maxlog * 2
    for (let i = 0; i < max; i += 1) {
      logger.info(`unit test msg ${i}`)
    }
    expect(memlog.archive.length).toBe(maxlog)
  })

  it('multi transport', () => {
    process.env.NODE_ENV = 'production'
    jest.resetModules()
    const log = require('../src/logger')
    expect(Object.keys(log.logger.transports).length).toBe(2)
  })

  it('colorized console', () => {
    const log = require('../src/logger')
    stdMocks.use()
    log.logger.info('colored')
    stdMocks.restore()
    const output = stdMocks.flush()
    const level = output.stdout[0].split(' ')[2]
    // ansi escape sequences
    const foregroundGreen = '\u001b[32m'
    const foregroundDefault = '\u001b[39m'
    expect(level).toMatch(foregroundGreen + 'info' + foregroundDefault)
  })

  it('timestamp', () => {
    const log = require('../src/logger')
    stdMocks.use()
    log.logger.info('testje')
    stdMocks.restore()
    const output = stdMocks.flush()
    expect(output.stdout[0]).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)
  })
})
