const bancoDeDados = require('../bancodedados');
const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(401).json({ mensagem: "'a senha não foi informada'!" });
    }
    if (senha_banco !== bancoDeDados.banco.senha) {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" });
    }
    next();
}
const validarSenhaEconta = (req, res, next) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) {
        return res.status(401).json({ mensagem: "O numero da conta não foi informado!" });
    }
    if (!senha) {
        return res.status(401).json({ mensagem: "A senha não foi informada!" });
    }
    next();
}
module.exports = { validarSenha, validarSenhaEconta }

