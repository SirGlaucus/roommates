const fs = require('fs')
const url = require('url');
const { v4: uuidv4 } = require('uuid')

const {
    nuevoRoommate,
    guardarRoommate } = require('./api-call')

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
        nuevoGasto.id = uuidv4().slice(30)
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

const putGastos = (req, res) => {
    const { id } = url.parse(req.url, true).query // Saca el ID del QueryString para poder realizar la comparacion
    let body = ''
    req.on('data', (chunk) => {
        body = chunk.toString()
    })

    req.on('end', () => {
        const nuevoGasto = JSON.parse(body)
        const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'))
        gastosJSON.gastos.forEach((viejoGasto) => {
            if (viejoGasto.id === id) {
                viejoGasto.roommate = nuevoGasto.roommate
                viejoGasto.descripcion = nuevoGasto.descripcion
                viejoGasto.monto = nuevoGasto.monto
            }
        })

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

const deleteGastos = (req, res) => {
    const { id } = url.parse(req.url, true).query

    const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'))
    console.log(gastosJSON.gastos)
    console.log('----------------------------------------------------------------------------')
    gastosJSON.gastos = gastosJSON.gastos.filter(data => data.id !== id)
    console.log(gastosJSON.gastos)
    fs.writeFile('gastos.json', JSON.stringify(gastosJSON), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Funcionando')
        }
        res.end('Eliminado con exito!')
    })
}

module.exports = {
    getHome,
    getRoommate,
    postRoomate,
    getGastos,
    postGastos,
    putGastos,
    deleteGastos
}