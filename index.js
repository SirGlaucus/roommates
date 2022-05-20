const http = require('http')

const {
    getHome,
    getRoommate,
    postRoomate,
    getGastos,
    postGastos,
    putGastos,
    deleteGastos
} = require('./restmethod')

// ------------------------------------ 
const applog = (req, res) => {
    console.log('->', req.url, req.method)
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
        putGastos(req, res)
    }

    if (req.url.startsWith('/gasto') && req.method === 'DELETE') {
        deleteGastos(req, res)
    }

}).listen(3000, console.log('Server ON en el puerto 3000'))