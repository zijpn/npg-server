import { App } from './app'
import { Backend } from './backend'
import { logger } from './logger'

const backend = new Backend()
backend.status().forEach((i) => {
  logger.info('Backend', i)
})

const app = new App()
