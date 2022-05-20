const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

const updateDebt = require('./updateDebt')


const nuevoRoommate = async () => {
    try {
        const {data} = await axios.get('http://randomuser.me./api')
        const roommate = data.results[0]
        const user = {
            id: uuidv4().slice(30),
            nombre: `${roommate.name.title} ${roommate.name.first} ${roommate.name.last}`,
            correo: roommate.email,
            debe: 0,
            recibe: 0
        }
        return user
    } catch(e) {
        throw e
    }
}

const guardarRoommate = (newRoommate) => {
    const roommatesJSON = JSON.parse(fs.readFileSync('roommates.json', 'utf8'))
    roommatesJSON.roommates.push(newRoommate)
    fs.writeFileSync('roommates.json', JSON.stringify(roommatesJSON))
    updateDebt()
}



module.exports = {
    nuevoRoommate,
    guardarRoommate,
}