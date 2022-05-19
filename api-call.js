const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

const nuevoRoommate = async () => {
    try {
        const {data} = await axios.get('http://randomuser.me./api')
        const roommate = data.results[0]
        const user = {
            id: uuidv4().slice(30),
            nombre: `${roommate.name.title} ${roommate.name.first} ${roommate.name.last}`,
            debe,
            recibe
        }
        return user
    } catch(e) {
        throw e
    }
}

const guardarRoommate = (roommate) => {
    const roommatesJSON = JSON.parse(fs.readFileSync('roommates.json', 'utf8'))
    roommatesJSON.usuarios.push(roommate)
    fs.writeFileSync('roommates.json', JSON.stringify(roommatesJSON))
}

// agregarGasto

// updateGasto()

module.exports = {
    nuevoRoommate,
    guardarRoommate
}