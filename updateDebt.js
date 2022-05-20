const fs = require('fs')

const updateDebt = () => {
    const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'))
    const roommatesJSON = JSON.parse(fs.readFileSync('roommates.json', 'utf8'))

    const gastosDivir = gastosJSON.gastos
    const roommatesArray = roommatesJSON.roommates
    const cantidadRoommates = roommatesArray.length

    gastosDivir.forEach((gasto) => {
        const montoDividido = gasto.monto / cantidadRoommates
        roommatesArray.forEach((roomie) => {
            if (roomie.nombre === gasto.roommate) {
                roomie.recibe =+ gasto.monto - montoDividido
            } else{
                roomie.debe =- montoDividido
            }
        })
    })

    roommatesJSON.roommates = roommatesArray

    fs.writeFile('roommates.json', JSON.stringify(roommatesJSON), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Funcionando')
        }
    })
}

module.exports = updateDebt