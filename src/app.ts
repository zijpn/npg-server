import express from 'express'

class App {
  public app: express.Application

  constructor () {
    this.app = express()
    this.config()
  }

  private config (): void {
    this.app.use(express.static('public'))
  }
}

export default new App().app
