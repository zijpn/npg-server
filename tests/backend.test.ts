import execa from 'execa'
import { Backend } from '../src/backend'

jest.mock('fs')
execa.sync = jest.fn((cmd, args, opts) => {
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
          case 'status':
            result.stdout = 'Running'
            break
          case 'env':
            switch (args[1]) {
              case '-u':
                result.stdout = `unset DOCKER_TLS_VERIFY\n
                unset DOCKER_HOST\n
                unset DOCKER_CERT_PATH\n
                unset DOCKER_MACHINE_NAME`
                break
              case 'npg-01':
                result.stdout = `export DOCKER_TLS_VERIFY="1"\n
                export DOCKER_HOST="tcp://192.168.99.101:2376"\n
                export DOCKER_CERT_PATH="/Users/zijpn/.docker/machine/machines/${args[1]}"\n
                export DOCKER_MACHINE_NAME="${args[1]}"`
                break
              case 'npg-02':
                result.stdout = `export DOCKER_TLS_VERIFY="1"\n
                export DOCKER_HOST="tcp://192.168.99.102:2376"\n
                export DOCKER_CERT_PATH="/Users/zijpn/.docker/machine/machines/${args[1]}"\n
                export DOCKER_MACHINE_NAME="${args[1]}"`
            }
            break
        }
      }
      break
  }
  return result
})

describe('backend', () => {

  it('list', () => {
    expect(Backend.list().length).toBe(2)
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

  it('status', () => {
    const backend = new Backend()
    const status = backend.status()
    expect(status.length).toBe(2)
  })

  it('error', () => {
    const tmp = execa.sync as jest.Mock
    tmp.mockClear()
    tmp.mockImplementation((cmd, args) => {
      const result = {
        code: 0,
        stderr: '',
        stdout: '',
      }
      if (args[0] === 'ls') {
        result.stdout = 'npg-01\nnpg-02'
      } else {
        result.code = 1,
        result.stderr = 'error'
      }
      return result
    })
    const backend = new Backend()
    expect(tmp.mock.calls.length).toBe(3)
  })

  it('throws', () => {
    const tmp = execa.sync as jest.Mock
    tmp.mockImplementation((cmd, args) => {
      throw new Error('troubles')
    })
    const backend = new Backend(['npg-01'])
    expect(backend.machine.length).toBe(0)
  })

})
