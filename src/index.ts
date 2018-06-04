import { App } from './app'
import { backend } from './backend'
import { logger } from './logger'

// get backend status
backend.status().then((status) => {
  for (const m of status) {
    logger.info(`Backend ${m.name} ${m.host} ${m.status}`)
  }
})

// create app
const app = new App()
