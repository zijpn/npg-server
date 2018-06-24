import execa from 'execa'
import { Backend } from '../src/backend'

jest.mock('fs')
jest.mock('execa', () => {
  return jest.fn().mockImplementation((cmd, args, opts) => {
    return new Promise((resolve) => {
      const result = {
        code: 0,
        stdout: '',
      }
      switch (cmd) {
        case 'docker-machine':
          if (args) {
            switch (args[0]) {
              case 'status':
                result.stdout = 'Stopped'
                break
            }
          }
          break
      }
      resolve(result)
    })
  })
})
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
          case 'inspect':
            result.stdout = `{
              "Driver": {
                  "IPAddress": "192.168.99.x",
                  "EnginePort": 2376
              },
              "HostOptions": {
                  "AuthOptions": {
                      "StorePath": "/Users/zijpn/.docker/machine/machines/${args[1]}"
                  }
              }
            }`
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
    expect(backend.machine.length).toBe(2)
    backend.machine.forEach((m, idx) => {
      expect(m.host).toMatch(/[0-9]*.[0-9]*.[0-9]*.[0-9]*/)
      expect(m.name).toMatch(Backend.list()[idx])
      expect(m.info.status).toEqual('unknown')
    })
  })

  it('constructor with parameter', () => {
    const backend = new Backend([])
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

  it('status', (done) => {
    const backend = new Backend()
    backend.status().then((status) => {
      expect(backend.machine[0].info.status).toBe('Stopped')
      expect(backend.machine[1].info.status).toBe('Stopped')
      done()
    })
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
