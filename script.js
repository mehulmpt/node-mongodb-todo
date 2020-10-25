const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Todo = require('./models/todo')

mongoose.connect('mongodb://localhost/firstmongo')

app.use('/', express.static(path.resolve(__dirname, 'assets')))

app.use(bodyParser.json())

app.post('/api/delete', async (req, res) => {
	const { record } = req.body
	console.log(record, '/api/delete')

	const response = await Todo.deleteOne({ record })

	console.log(response, '/api/delete repsonse')

	res.json({ status: 'ok' })
})

app.post('/api/modify', async (req, res) => {
	const { old: oldTitle, new: newTitle } = req.body

	const response = await Todo.updateOne(
		{
			record: oldTitle
		},
		{
			$set: {
				record: newTitle
			}
		}
	)

	console.log(response)

	res.json({ status: 'ok' })
})

app.get('/api/get', async (req, res) => {
	const records = await Todo.find({})
	// console.log('Response => ', records)
	res.json(records)
})

app.post('/api/create', async (req, res) => {
	const record = req.body
	console.log(record)

	// * CREATE (_C_RUD)
	const response = await Todo.create(record)

	console.log(response)

	res.json({ status: 'ok' })
})

app.listen(13371, '127.0.0.1', () => {
	console.log('Server up')
})
