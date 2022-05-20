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

const updateDebt = require('./updateDebt')

// ------------------------------------ 
http.createServer((req, res) => {
    
    if (req.url == '/' && req.method === 'GET') {
        getHome(req, res)
        updateDebt()
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