const nodemailer = require('nodemailer')
const fs = require('fs')

const enviar = (datos) => {
    return new Promise((resolve, reject) => {
        const gasto = datos // Los datos van a ser recibidos al momento de generarse un nuevo gasto, por eso no es necesario consultar la API

        const roomies = JSON.parse(fs.readFileSync('roommates.json', 'utf8')) // Necesario para extraer la lista de correos de roommates.json

        const mails = roomies.roommates.map(e => {
            return e.correo
        }) // Transformamos a un array unicamente de correos

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bananababosatorres@gmail.com', // POR FAVOR INSERTAR SU PROPIO CORREO
                pass: 'labanana420', // POR FAVOR INSERTAR SU PROPIO CONTRASEÑA
            },
        })
        let mailOptions = {
            from: 'bananababosatorres@gmail.com', // POR FAVOR INSERTAR SU PROPIO CORREO
            to: ['glaucusjoseph@gmail.com'].concat(mails), // POR FAVOR INSERTAR SU PROPIO CORREO
            subject: 'Compra realizada',
            html: `<h1>${gasto.roommate} ha comprado ${gasto.descripcion} por un valor de ${gasto.monto}`
        }
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) reject(err)
            if (data) resolve(data)
        })
    })
}

module.exports = enviar 
