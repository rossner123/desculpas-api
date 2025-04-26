const express = require('express')
const app = express()
const fs = require('fs');

const desculpas = JSON.parse(fs.readFileSync('desculpas.json', 'utf-8'))

app.get("/desculpa", (req, res) => {
	const tipo = req.query.tipo || "realistas"

	const tiposValidos = ['engracadas', 'realistas', 'absurdas', 'profissionais'];
	if (!tiposValidos.includes(tipo)) {
		return res.status(400).json({ erro: 'Tipo de desculpa inválido. Use um dos seguintes: engraxadas, realistas, absurdas, profissionais.' });
	}

	const inicio = desculpas.partesIniciais[Math.floor(Math.random() * desculpas.partesIniciais.length)]
	const motivo = desculpas.motivos[tipo][Math.floor(Math.random() * desculpas.motivos[tipo].length)]
	const final = desculpas.finais[Math.floor(Math.random() * desculpas.finais.length)]

	const desculpa = `${inicio} ${motivo} ${final}`

	setTimeout(() => {
		res.json({desculpa})
	}, 2000)
})

app.listen(3000, () => {
	console.log("rodando em http://localhost:3000")
})
