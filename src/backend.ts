import Docker from 'dockerode'
import execa from 'execa'
import fs from 'fs'
import { logger } from './logger'

export class Backend {

  public static list() {
    logger.debug('docker-machine ls -q')
    return execa.sync('docker-machine', ['ls', '-q']).stdout.split('\n').filter((v) => v !== '')
  }

  public machine: Array<{
    docker: Docker,
    host: string,
    name: string,
    status: string,
  }>

  constructor(list: string[] = Backend.list()) {
    this.machine = []
    list.forEach((name) => {
      try {
        // inspect also works when machine is stopped
        logger.debug(`docker-machine inspect ${name}`)
        const env = execa.sync('docker-machine', ['inspect', name]).stdout
        const obj = JSON.parse(env)
        const host = obj.Driver.IPAddress
        const port = obj.Driver.EnginePort
        const certPath = obj.HostOptions.AuthOptions.StorePath
        this.machine.push({
          docker: new Docker({
            ca: fs.readFileSync(certPath + '/ca.pem'),
            cert: fs.readFileSync(certPath + '/cert.pem'),
            host,
            key: fs.readFileSync(certPath + '/key.pem'),
            port: parseInt(port, 10),
          }),
          host,
          name,
          status: 'unknown',
        })
      } catch (err) {
        logger.error(err)
      }
    })
  }

  public status() {
    const p = this.machine.map((m) => {
      logger.debug(`docker-machine status ${m.name}`)
      return execa('docker-machine', ['status', m.name]).then((r) => {
        m.status = r.stdout
        return m
      })
    })
    return Promise.all(p)
  }
}
