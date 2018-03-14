import app from './app'
import { Backend } from './backend'
import { logger } from './logger'

const port = process.env.PORT || 3000

const backend = new Backend()
backend.status().forEach((i) => {
  logger.info('Backend', i)
})

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`)
})
