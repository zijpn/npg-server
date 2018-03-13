// manually call 'mock' before the imports
import shelljs from 'shelljs'
if (!shelljs.which('docker-machine')) {
  jest.mock('execa', () => ({
    sync: jest.fn((cmd, args, opts) => {
      const result = {
        code: 0,
        stdout: '',
      }
      switch (cmd) {
        case 'docker-machine':
          if (args) {
            switch (args[0]) {
              case 'ls':
                result.stdout = 'npg-01\nnpg-02'
                break
              case 'env':
                switch (args[1]) {
                  case '-u':
                    result.stdout = `unset DOCKER_TLS_VERIFY\n
                    unset DOCKER_HOST\n
                    unset DOCKER_CERT_PATH\n
                    unset DOCKER_MACHINE_NAME`
                    break
                  default:
                    result.stdout = `export DOCKER_TLS_VERIFY="1"\n
                    export DOCKER_HOST="tcp://192.168.99.101:2376"\n
                    export DOCKER_CERT_PATH="/Users/zijpn/.docker/machine/machines/${args[1]}"\n
                    export DOCKER_MACHINE_NAME="${args[1]}"`
                }
                break
            }
          }
          break
      }
      return result
    }),
  }))
}

import execa from 'execa'
import Backend from '../src/backend'

describe('backend', () => {

  it('list', () => {
    expect(Array.isArray(Backend.list())).toBe(true)
  })

  it('constructor without parameter', () => {
    const backend = new Backend()
    expect(Array.isArray(backend.machine)).toBe(true)
    backend.machine.forEach((m, idx) => {
      expect(m.host).toMatch(/[0-9]*.[0-9]*.[0-9]*.[0-9]*/)
      expect(m.name).toMatch(Backend.list()[idx])
    })
  })

  it('constructor with parameter', () => {
    const backend = new Backend(['-u'])
    expect(backend.machine).toHaveLength(0)
  })

  it('docker info', async () => {
    const backend = new Backend()
    await Promise.all(backend.machine.map(async (m, idx) => {
      if (!execa.sync.hasOwnProperty('mock')) {
        const info = await m.docker.info()
        expect(info.Name).toBe(backend.machine[idx].name)
      }
    }))
  })

})
