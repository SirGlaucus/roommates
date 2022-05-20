const fs = require('fs')
const url = require('url');
const { v4: uuidv4 } = require('uuid')

const { nuevoRoommate, guardarRoommate } = require('./api-call')
const updateDebt = require('./updateDebt')
const enviar = require('./send-mail')

// Para leer nuestro archivo html
const getHome = (req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(fs.readFileSync('index.html', 'utf8'))
}

const getRoommate = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(fs.readFileSync('roommates.json', 'utf8'))
}

const postRoomate = (req, res) => {
    nuevoRoommate().then(async (roommate) => {
        res.writeHead(201)
        guardarRoommate(roommate)
        res.end(JSON.stringify(roommate))
    }).catch(e => {
        res.writeHead(500)
        res.end()
        console.log('Error en el registro de un usuario random', e)
    })
}

const getGastos = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(fs.readFileSync('gastos.json', 'utf8'))
}

const postGastos = (req, res) => {
    let body = ''
    req.on('data', (chunk) => {
        body = chunk.toString()
    })

    req.on('end', async () => {
        const nuevoGasto = JSON.parse(body)
        nuevoGasto.id = uuidv4().slice(30)
        const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'))

        try {
            await enviar(nuevoGasto).then(() => {
                console.log('Se envio el correo')
            }).catch((e) => {
                console.log('Ocurrio un problema tratando de enviar el correo', e)
            })

            gastosJSON.gastos.push(nuevoGasto)
            fs.writeFile('gastos.json', JSON.stringify(gastosJSON), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    updateDebt()

                }
                res.writeHead(201)
                res.end('Gasto creado con exito')
            })
        } catch (e) {
            res.writeHead(500)
            res.end(err)
            throw err
        }
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
        try {
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
                    updateDebt()
                    console.log('Funcionando')
                }
                res.writeHead(201)
                res.end('Edicion realizado con exito!')

            })
        } catch (err) {
            res.writeHead(500)
            res.end(err)
            throw err
        }
    })
}

const deleteGastos = (req, res) => {
    try {
        const { id } = url.parse(req.url, true).query
        const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'))
        gastosJSON.gastos = gastosJSON.gastos.filter(data => data.id !== id)
        fs.writeFile('gastos.json', JSON.stringify(gastosJSON), (err) => {
            if (err) {
                console.log(err)
            } else {
                updateDebt()
                console.log('Funcionando')
            }
            res.writeHead(201)
            res.end('Eliminado con exito!')
        })
    } catch (e) {
        res.writeHead(500)
        res.end(err)
        throw err
    }
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