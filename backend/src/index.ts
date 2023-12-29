import express from 'express'
import { connectToMongoDB } from './db'

connectToMongoDB()

const app = express()
const PORT = 5500

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Task tracker server.' })
})

app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}.`)
})
