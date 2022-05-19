const axios = require('axios')

const llamadoApi = async () => {
    const data = await axios.get('https://mindicador.cl/api')
    return data
}

module.exports = llamadoApi
