import express from 'express'
import path from 'path'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
  }

  private config(): void {
    let root = path.join(__dirname, '../public')
    if (process.env.NODE_ENV === 'production') {
      root = path.join(__dirname, '../../public')
    }
    this.app.use(express.static(root))
    this.app.all('*', (req, res) => {
      res.sendFile('index.html', { root })
    })
  }
}

export default new App().app
