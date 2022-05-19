const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

const nuevoUsuario = async () => {
    try {
        const {data} = await axios.get('http://randomuser.me./api')
        const usuario = data.results[0]
        const user = {
            id: uuidv4().slice(30),
            nombre: `${usuario.name.title} ${usuario.name.first} ${usuario.name.last}`,
        }
        return user
    } catch(e) {
        throw e
    }
}

const guardarUsuario = (usuario) => {
    const usuariosJSON = JSON.parse(fs.readFileSync('usuarios.json', 'utf8'))
    usuariosJSON.usuarios.push(usuario)
    fs.writeFileSync('usuarios.json', JSON.stringify(usuariosJSON))
}

module.exports = {
    nuevoUsuario,
    guardarUsuario
}