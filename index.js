const http = require('http')
const fs = require('fs')

const { nuevoRoommate, guardarRoommate } = require('./api-call')

// ------------------------------------ 
const applog = (req, res) => {
    console.log('->', req.url, req.method)
}

const getHome = (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.end(fs.readFileSync('index.html', 'utf8'))
}

const getRoommate = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(fs.readFileSync('roommates.json', 'utf8'))
}

const postRoomate = (req, res) => {
    nuevoRoommate().then(async (roommate) => {
        guardarRoommate(roommate)
        res.end(JSON.stringify(roommate))
    }).catch(e => {
        res.statusCode = 500
        res.end()
        console.log('Error en el registro de un usuario random', e)
    })
}

const getGastos = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(fs.readFileSync('gastos.json', 'utf8'))
}

// ------------------------------------ 
http.createServer((req, res) => {
    applog(req, res)

    if (req.url == '/' && req.method === 'GET') {
        getHome(req, res)
    }

    if (req.url.startsWith('/roommate') && req.method === 'GET') {
        getRoommate(req, res)
    }

    if (req.url.startsWith('/roommate') && req.method === 'POST') {
        postRoomate(req, res)
    }

    if (req.url.startsWith('/gastos') && req.method === 'GET') {
        getGastos(req, res)
    }

}).listen(3000, console.log('Server ON en el puerto 3000'))