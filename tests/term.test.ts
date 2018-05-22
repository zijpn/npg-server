import http from 'http'
import ioBack from 'socket.io'
import * as io from 'socket.io-client'
import { Term } from '../src/term'

// https://medium.com/@tozwierz/testing-socket-io-with-jest-on-backend-node-js-f71f7ec7010f
let httpServer
let httpPort
let ioServer
let serverSocket = null
let clientSocket = null

const isTravis = 'TRAVIS' in process.env && 'CI' in process.env

beforeAll(() => {
  httpServer = http.createServer().listen()
  httpPort = httpServer.listen().address().port
  ioServer = ioBack(httpServer)
  ioServer.on('connection', (socket) => {
    serverSocket = socket
  })
})

afterAll(() => {
  ioServer.close()
  serverSocket = null
  httpServer.close()
})

// Run before each test
beforeEach((done) => {
  clientSocket = io.connect(`http://localhost:${httpPort}`, {
    forceNew: true,
    reconnectionDelay: 0,
    transports: ['websocket'],
  })
  clientSocket.on('connect', () => {
    done()
  })
})

// Run after each test
afterEach(() => {
  if (clientSocket.connected) {
    clientSocket.disconnect()
  }
})

describe('term', () => {
  it('create', (done) => {
    let id = null
    const term = new Term(serverSocket)
    clientSocket.on('created', (data) => {
      expect(data.container).toEqual('')
      expect(data.id).toEqual(id)
      expect(data.process).toEqual(process.env.SHELL)
      term.destroy(data.id)
      expect(term.terms).toEqual({})
      done()
    })
    term.create()
    id = Number(Object.keys(term.terms)[0])
  })

  it('write', (done) => {
    let id = null
    let res = ''
    const term = new Term(serverSocket)
    clientSocket.on('created', (data) => {
      id = data.id
      term.write(id, 'pwd\n')
    })
    clientSocket.on('data', (data) => {
      res += data.data
    })
    term.create()
    setTimeout(() => {
      const l = res.split('\r\n')
      expect(l[0]).toEqual('pwd')
      if (!isTravis) {
        expect(l[2]).toEqual(process.env.HOME)
      }
      term.destroy(id)
      done()
    }, 100)
  })

  it('resize', (done) => {
    let id = null
    let res = ''
    const linesize = 34
    const term = new Term(serverSocket)
    clientSocket.on('created', (data) => {
      id = data.id
      term.resize(id, linesize, 24)
      term.write(id, 'echo 0123456789abcdefghiklmnopqrtsuvwxyz\n')
    })
    clientSocket.on('data', (data) => {
      res += data.data
    })
    term.create()
    setTimeout(() => {
      const l = res.split('\r\n')
      const r = l[1].split('\r')
      if (!isTravis) {
        expect(r[0].length).toBe(linesize + 1)
      }
      term.destroy(id)
      done()
    }, 100)
  })
})
