const express = require("express");
const rotas = require('./rotas/rotasBanco')
const app = express()

app.use(express.json())
app.use(rotas)

app.listen(3000)