const horario = () => {
    const dataHora = new Date()
    const ano = dataHora.getFullYear();
    const mes = String(dataHora.getMonth() + 1).padStart(2, '0')
    const dia = String(dataHora.getDate()).padStart(2, '0')
    const hora = String(dataHora.getHours()).padStart(2, '0')
    const minuto = String(dataHora.getMinutes()).padStart(2, '0')
    const segundo = String(dataHora.getSeconds()).padStart(2, '0')
    const dataHoraFormatada = `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`
    return dataHoraFormatada;
}

module.exports = { horario }
