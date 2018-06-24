import Docker from 'dockerode'
import execa from 'execa'
import fs from 'fs'
import { logger } from './logger'

process.env.PATH = [
  '/usr/local/bin',
  process.env.PATH,
].join(':')

export class Backend {

  public static list() {
    let list: string[] = []
    try {
      logger.debug('docker-machine ls -q')
      list = execa.sync('docker-machine', ['ls', '-q']).stdout.split('\n').filter((v) => v !== '')
    } catch (err) {
      logger.error('docker-machine not installed')
    }
    return list
  }

  public defaultInfo = {
    containers: 0,
    images: 0,
    status: 'unknown',
  }

  public machine: Array<{
    docker: Docker,
    host: string,
    // current status
    info: {
      containers: number,
      images: number,
      status: string,
    },
    // previous status
    last: {
      containers: number,
      images: number,
      status: string,
    }
    name: string,
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
        const certPath = obj.HostOptions.AuthOptions.StorePath
        this.machine.push({
          docker: new Docker({
            ca: fs.readFileSync(certPath + '/ca.pem'),
            cert: fs.readFileSync(certPath + '/cert.pem'),
            host,
            key: fs.readFileSync(certPath + '/key.pem'),
            port: parseInt(obj.Driver.EnginePort, 10),
          }),
          host,
          info: Object.assign({}, this.defaultInfo),
          last: Object.assign({}, this.defaultInfo),
          name,
        })
      } catch (err) {
        logger.error(err)
      }
    })
  }

  public status() {
    const p = this.machine.map((m) => {
      // logger.debug(`docker-machine status ${m.name}`)
      return execa('docker-machine', ['status', m.name]).then((r) => {
        m.last.status = m.info.status
        m.info.status = r.stdout
      }).then(() => {
        // generic driver uses 15 sec timeout (https://github.com/docker/machine/pull/4030)
        // and this value is not configurable :-(
        //   https://github.com/vigasin/machine/blob/master/drivers/generic/generic.go
        // $ time docker-machine --debug status npg-01
        // ...
        // Stopped
        // ...
        // real    0m15.037s
        // user    0m0.009s
        // sys     0m0.011s
        if (m.info.status === 'Running') {
          return m.docker.info()
        } else {
          return Promise.resolve({
            Containers: 0,
            Images: 0,
          })
        }
      }).then((info) => {
        m.last.containers = m.info.containers
        m.info.containers = info.Containers
        m.last.images = m.info.images
        m.info.images = info.Images
        return m
      })
    })
    return Promise.all(p)
  }
}

export const backend = new Backend()
