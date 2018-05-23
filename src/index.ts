import { App } from './app'
import { Backend } from './backend'
import { logger } from './logger'

// create backend
const backend = new Backend()

// get backend status
backend.status().then((status) => {
  for (const m of status) {
    logger.info(`Backend ${m.name} ${m.host} ${m.status}`)
  }
})

// create app
const app = new App()
