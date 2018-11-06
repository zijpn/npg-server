import http from 'http'
import ioBack from 'socket.io'
import * as io from 'socket.io-client'
import { Term } from '../src/term'
import { AddressInfo } from 'net';

// https://medium.com/@tozwierz/testing-socket-io-with-jest-on-backend-node-js-f71f7ec7010f
let httpServer: http.Server
let httpPort = 0
let ioServer: any
let serverSocket: ioBack.Socket
let clientSocket: any

const isTravis = 'TRAVIS' in process.env && 'CI' in process.env

beforeAll(() => {
  httpServer = http.createServer().listen()
  httpPort = (httpServer.address() as AddressInfo).port
  ioServer = ioBack(httpServer)
  ioServer.on('connection', (socket: ioBack.Socket) => {
    serverSocket = socket
  })
})

afterAll(() => {
  ioServer.close()
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
    let id: number
    const term = new Term(serverSocket)
    clientSocket.on('created', (data: any) => {
      expect(data.backend).toEqual('')
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
    let id: number
    let res = ''
    const term = new Term(serverSocket)
    clientSocket.on('created', (data: any) => {
      id = data.id
      term.write(id, 'pwd\n')
    })
    clientSocket.on('data', (data: any) => {
      res += data.data
    })
    term.create()
    setTimeout(() => {
      const l = res.split('\r\n')
      expect(l[0]).toEqual('pwd')
      if (!isTravis) {
        expect(l[l.length - 2]).toEqual(process.env.HOME)
      }
      term.destroy(id)
      done()
    }, 200)
  })

  it('resize', (done) => {
    let id: number
    let res = ''
    const linesize = 34
    const term = new Term(serverSocket)
    clientSocket.on('created', (data: any) => {
      id = data.id
      term.resize(id, linesize, 24)
      term.write(id, 'echo 0123456789abcdefghiklmnopqrtsuvwxyz\n')
    })
    clientSocket.on('data', (data: any) => {
      res += data.data
    })
    term.create()
    setTimeout(() => {
      const l = res.split('\r\n')
      if (!isTravis) {
        const r = l[l.length - 3].split('\r')
        expect(r.length).toEqual(2)
      }
      term.destroy(id)
      done()
    }, 200)
  })
})
