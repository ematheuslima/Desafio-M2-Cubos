# Desafio do módulo 2
# API do banco cubos


# Descrição
Como desafio do módulo 2 no curso de back-end da cubos, foi pedido para que criássemos uma API de um banco digital com algumas funcões específicas

# Funções
Criar conta bancária
Listar contas bancárias
Atualizar os dados do usuário da conta bancária
Excluir uma conta bancária
Depositar em uma conta bancária
Sacar de uma conta bancária
Transferir valores entre contas bancárias
Consultar saldo da conta bancária
Emitir extrato bancário

# Pre-requesitos
![VS Code](https://img.shields.io/badge/VS%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
Tambem é presiso uma ferramenta para testar as rotas, como o insominia por exemplo

#inicialização
fazer um fork o projeto no repositório do GitHub 
fazer um clone no repositório na sua maquina com o comando git clone

# Instalação 
usar na raiz do projeto o comando npm install para instalar os pacotes necessários presentes na pasta package.json

# Documentação
O programa utiliza a porta local 3000 como servidor atravez do comando listen()
 
A organização dos arquivos segue um padrão REST 

## EndPoints :point_down:

### **Listar contas cadastradas**
 rotas.get('/contas', validarSenha, listarContas)
 Este endpoint cria a página contas atravéz do GET, antes de chegar a página, a rota passa por um intermediário (validarSenha) que verifica se o usuário informou a senha (passado como query params na url) e se à mesma esta correta, caso a esteja tudo certo ele segue para a página e lista as contas. 
 **Exemplo** point_down:
![imagens](https://imgur.com/a/zywUAAZ)

### **Criar contas**
 rotas.post('/contas', criarConta)
 Este endpoint cria uma nova conta atravéz de um POST, o usuário deverá enviar uma requisição no bory em formato de objeto json as seguintes propriedades: nome, CPF, data de nascimento, telefone, email, senha. caso o usuário não informe um dos campos ou os campos CPF e email já existam no banco de dados o programa retorna um código erro 400 com uma mensagem, Caso esteja tudo correto ele retorna código 200 e cria a conta com um número único da conta.
 **Exemplo** point_down:
 ![imagens](https://imgur.com/a/SISGOlw)

### **Atualizar dados da conta**
  rotas.put('/contas/:numeroConta/usuario', attCadastro)
  Este endpoint atualiza os dados de um cadastro, o usuário deverá informar um numero de conta válido no parametro da url e enviar uma requisição no bory em formato de objeto json as seguintes propriedades: nome, CPF, data de nascimento, telefone, email, senha. Caso CPF e email já existam ou ele nao informe um dos campos o programa retorna um código erro 400 com uma mensagem, Caso esteja tudo correto ele retorna código 200 e atualiza os dados.
  **Exemplo** point_down:
 ![imagens](https://imgur.com/a/LGyNdkp)

### **Deletar conta**
 rotas.delete('/contas/:numeroConta', deleteCadastro)
 Este endpoint deleta uma conta, caso a conta informada nao exista ou o saldo for maior que 0 o programa retorna um código erro 400 com uma mensagem, Caso esteja tudo correto ele retorna código 200 e deleta a conta.
  **Exemplo** point_down:
 ![imagens](https://imgur.com/a/4fKvsRN)

 ### **Depositar**
 rotas.post('/transacoes/depositar', depositar)
 Este endpoint deposita um valor na conta do usuário informado, o usuário deverá enviar uma requisição no bory em formato de objeto json as seguintes propriedades: numeroConta e valor. Caso o numero da conta e valor não for informado ou o numero da conta não exista ou o valor for menor que 0 o programa retorna um código erro 400 com uma mensagem, Caso esteja tudo correto ele retorna código 200 e faz o depósito.
  **Exemplo** point_down:
 ![imagens](https://imgur.com/a/KhBHBFc)

 ### **Sacar**
 rotas.post('/transacoes/sacar', sacar)
 Este endpoint saca um valor na conta do usuário informado, o usuário deverá enviar uma requisição no bory em formato de objeto json as seguintes propriedades: numeroConta, senha e valor. Caso o numero da conta senha e valor não for informado ou o numero da conta não exista ou o valor for menor que saldo, ou a senha esteja incorreta o programa retorna um código erro 400 com uma mensagem, Caso esteja tudo correto ele retorna código 200 e faz o saque.
  **Exemplo** point_down:
 ![imagens](https://imgur.com/a/tctbN5W)

 ### **Transferir**
 rotas.post('/transacoes/transferir', transferir)
  Este endpoint faz uma tranferência entre contas informadas no bory junto com valor e senha e segue a mesma lógica de validações dos anteriores, se estiver tudo valido a transferência sera feita.

### **Saldo**
rotas.get('/contas/saldo', validarSenhaEconta, saldo)
 Este endpoint retorna o saldo da conta e senha iformada como parametro query e segue a mesma lógica de validaçao dos anteriores

### **Extrato**
rotas.get('/contas/extrato', validarSenhaEconta, extrato)
 Este endpoint retorna o extrato da conta e senha iformada como parametro query e segue a mesma lógica de validaçao dos anteriores



 




