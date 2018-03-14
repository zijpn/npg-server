import Docker from 'dockerode'
import execa from 'execa'
import fs from 'fs'
import { logger } from '../src/logger'

export class Backend {

  public static list() {
    logger.debug('docker-machine ls -q')
    return execa.sync('docker-machine', ['ls', '-q']).stdout.split('\n').filter((v) => v !== '')
  }

  public machine: Array<{
    docker: Docker,
    host: string,
    name: string,
  }>

  constructor(list: string[] = Backend.list()) {
    this.machine = []
    list.forEach((name) => {
      try {
        logger.debug(`docker-machine env ${name}`)
        const env = execa.sync('docker-machine', ['env', name]).stdout
        const dockerHost = env.match(/DOCKER_HOST="tcp:\/\/[0-9]*.[0-9]*.[0-9]*.[0-9]*:[0-9]*"/)
        const dockerCertPath = env.match(/DOCKER_CERT_PATH="[a-zA-Z/.0-9-]*"/)
        if (dockerHost && dockerCertPath) {
          const hostPort = dockerHost[0].split('"')[1].split(':')
          const certPath = dockerCertPath[0].split('"')[1]
          const host = hostPort[1].replace(/\//g, '')
          this.machine.push({
            docker: new Docker({
              ca: fs.readFileSync(certPath + '/ca.pem'),
              cert: fs.readFileSync(certPath + '/cert.pem'),
              host,
              key: fs.readFileSync(certPath + '/key.pem'),
              port: parseInt(hostPort[2], 10),
            }),
            host,
            name,
          })
        }
      } catch (err) {
        logger.error(err)
      }
    })
  }

  public status(): string[] {
    const s: string[] = []
    for (const m of this.machine) {
      logger.debug(`docker-machine status ${m.name}`)
      const status = execa.sync('docker-machine', ['status', m.name]).stdout
      s.push(`${m.name} ${m.host} ${status}`)
    }
    return s
  }

}
