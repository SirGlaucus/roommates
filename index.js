const http = require('http')
const fs = require('fs')

const {
    nuevoRoommate,
    guardarRoommate} = require('./api-call')

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

const postGastos = (req, res) => {
    let body = ''
    req.on('data', (chunk) => {
        body = chunk.toString()
    })
    req.on('end', () => {
        const nuevoGasto = JSON.parse(body)
        const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'))
        gastosJSON.gastos.push(nuevoGasto)
        fs.writeFile('gastos.json', JSON.stringify(gastosJSON), (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Funcionando')
            }
            res.end('Premio editado con exito!')
        })
    })
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

    if (req.url.startsWith('/gasto') && req.method === 'POST') {
        postGastos(req, res)
    }

    if (req.url.startsWith('/gasto') && req.method === 'PUT') {
        
    }

}).listen(3000, console.log('Server ON en el puerto 3000'))