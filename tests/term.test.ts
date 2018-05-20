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
})
