const { Router } = require('express')
const { listarContas, criarConta, attCadastro, deleteCadastro, depositar, sacar, transferir, saldo, extrato } = require('../controladores/controle-do-banco')
const { validarSenha, validarSenhaEconta } = require('../controladores/intermediarios')
const rotas = Router()


rotas.get('/contas', validarSenha, listarContas)
rotas.post('/contas', criarConta)
rotas.put('/contas/:numeroConta/usuario', attCadastro)
rotas.delete('/contas/:numeroConta', deleteCadastro)
rotas.post('/transacoes/depositar', depositar)
rotas.post('/transacoes/sacar', sacar)
rotas.post('/transacoes/transferir', transferir)
rotas.get('/contas/saldo', validarSenhaEconta, saldo)
rotas.get('/contas/extrato', validarSenhaEconta, extrato)

module.exports = rotas