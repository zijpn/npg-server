import express from 'express'

class App {
  public app: express.Application

  constructor () {
    this.app = express()
    this.config()
    this.routes()
  }

  private config (): void {
    // only serve static assets in production
    if (process.env.NODE_ENV === 'production') {
      this.app.use(express.static('public'))
    }
  }

  private routes (): void {
    /*
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    this.app.use('/', router)
    */
  }
}

export default new App().app
