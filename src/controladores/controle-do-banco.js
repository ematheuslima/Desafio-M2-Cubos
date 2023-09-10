
let { contas, depositos, saques, transferencias } = require('../bancodedados');
let contadorContas = 1
const { horario } = require('../marcar-horas')

const listarContas = (req, res) => {
    res.status(200).json(contas)
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos sao obrigatorios" })
    }
    const verificarEmail = contas.find((conta) => {
        return email === conta.usuario.email
    })
    const verificarCpf = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    })
    if (verificarEmail) {
        return res.status(400).json({ mensagem: 'Este email ja esta cadastrado' })
    }
    if (verificarCpf) {
        return res.status(400).json({ mensagem: 'Este cpf ja esta cadastrado' })
    }
    let conta = {
        numero: contadorContas++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }
    contas.push(conta)
    res.status(204).json()
}

const attCadastro = (req, res) => {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos sao obrigatorios" })
    }
    const verificarEmail = contas.find((conta) => {
        return email === conta.usuario.email
    })
    const verificarCpf = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    })
    if (verificarEmail) {
        return res.status(400).json({ mensagem: 'Este email ja esta cadastrado' })
    }
    if (verificarCpf) {
        return res.status(400).json({ mensagem: 'Este cpf ja esta cadastrado' })
    }

    const conta = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })
    if (!conta) {
        return res.status(400).json({ mensagem: 'A conta informada nao existe' })
    }
    conta.usuario.nome = nome
    conta.usuario.cpf = cpf
    conta.usuario.data_nascimento = data_nascimento
    conta.usuario.telefone = telefone
    conta.usuario.email = email
    conta.usuario.senha = senha
    return res.status(204).json()
}

const deleteCadastro = (req, res) => {
    const conta = contas.find((conta) => {
        return conta.numero === Number(req.params.numeroConta)
    })
    if (!conta) {
        return res.status(400).json({ mensagem: "Esta conta nao existe" })
    }
    if (conta.saldo > 0) {
        return res.status(400).json({ mensagem: "Para deletar uma conta o saldo deve ser 0" })
    }
    contas = contas.filter((conta) => {
        return conta.numero !== Number(req.params.numeroConta)
    })
    return res.status(204).json()
}

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'Informar numero da conta e valor do deposito é obrigario' })
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor do deposito deve ser maior que 0' })
    }
    const conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })
    if (!conta) {
        return res.status(400).json({ mensagem: "Esta conta nao existe" })
    }
    conta.saldo += Number(valor)
    const registro = {
        data: horario(),
        numero_conta,
        valor
    }
    depositos.push(registro)
    return res.status(204).json()

}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body
    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'Informar numero da conta, valor do saque e senha é obrigario' })
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor do saque deve ser maior que 0' })
    }
    const conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })
    if (!conta) {
        return res.status(400).json({ mensagem: 'Essa conta não existe' })
    }
    if (conta.usuario.senha !== String(senha)) {
        return res.status(400).json({ mensagem: 'a senha esta incorreta' })
    }
    if (valor > conta.saldo) {
        return res.status(400).json({ mensagem: 'O saldo não é suficiente para este saque' })
    }
    conta.saldo -= valor
    const registro = {
        data: horario(),
        numero_conta,
        valor
    }
    saques.push(registro)
    return res.status(204).json()
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body
    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: 'Informar numero da conta origem, numero da conta destino, valor da tranferência e senha é obrigario' })
    }
    const contaDeOrigem = contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem)
    })
    if (!contaDeOrigem) {
        return res.status(400).json({ mensagem: 'Essa conta de origem não existe' })
    }
    const contaDeDestino = contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino)
    })
    if (!contaDeDestino) {
        return res.status(400).json({ mensagem: 'Essa conta de destino não existe' })
    }
    if (contaDeOrigem.numero === contaDeDestino.numero) {
        return res.status(400).json({ mensagem: 'A transferência não pode ser feita para a mesma conta' })
    }
    if (contaDeOrigem.usuario.senha !== String(senha)) {
        return res.status(400).json({ mensagem: 'a senha esta incorreta' })
    }
    if (valor > contaDeOrigem.saldo) {
        return res.status(400).json({ mensagem: 'O saldo não é suficiente para esta tranferência' })
    }
    contaDeOrigem.saldo -= valor
    contaDeDestino.saldo += valor
    const registro = {
        data: horario(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }
    transferencias.push(registro)
    return res.status(204).json()
}
const saldo = (req, res) => {
    const { numero_conta, senha } = req.query
    const contaValida = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })
    const senhaValida = contas.find((conta) => {
        return Number(conta.usuario.senha) === Number(senha)
    })
    if (!contaValida) {
        return res.status(401).json({ mensagem: "Essa conta nao existe" });
    }
    if (!senhaValida) {
        return res.status(401).json({ mensagem: "Essa senha esta incorreta" });
    }
    return res.status(200).json({ saldo: contaValida.saldo })

}
const extrato = (req, res) => {
    const { numero_conta, senha } = req.query
    const contaValida = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })
    const senhaValida = contas.find((conta) => {
        return Number(conta.usuario.senha) === Number(senha)
    })
    if (!contaValida) {
        return res.status(401).json({ mensagem: "Essa conta nao existe" });
    }
    if (!senhaValida) {
        return res.status(401).json({ mensagem: "Essa senha esta incorreta" });
    }
    const tdsDespositos = depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta
    })
    const tdsSaques = saques.filter((saque) => {
        return saque.numero_conta === numero_conta
    })
    const Enviadas = transferencias.filter((transferencia) => {
        return Number(transferencia.numero_conta_origem) === Number(numero_conta)
    })
    const recebidas = transferencias.filter((transferencia) => {
        return Number(transferencia.numero_conta_destino) === Number(numero_conta)
    })
    return res.status(200).json({
        depositos: tdsDespositos,
        saques: tdsSaques,
        transfrencias_enviadas: Enviadas,
        transferencias_recebidas: recebidas
    })
}

module.exports = { listarContas, criarConta, attCadastro, deleteCadastro, depositar, sacar, transferir, saldo, extrato }

