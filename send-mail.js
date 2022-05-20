const nodemailer = require('nodemailer')
const fs = require('fs')


const enviar = (html) => {
    return new Promise((resolve, reject) => {

        const roomies = JSON.parse(fs.readFileSync('roommates.json', 'utf8'))
        const mails = roomies.roommates.map(e => {
            return e.correo
        })

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bananababosatorres@gmail.com',
                pass: 'labanana420',
            },
        })
        let mailOptions = {
            from: 'bananababosatorres@gmail.com',
            to: ['glaucusjoseph@gmail.com'].concat(mails),
            subject: 'Prueba 5',
            html: '¿Funcionas?'
        }
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) reject(err)
            if (data) resolve(data)
        })
    })
}

/*enviar().then(() => {
    console.log('Se envio el correo')
}).catch(() => {
    console.log('Ocurrio un problema tratando de enviar el correo')
})*/


module.exports = enviar 
