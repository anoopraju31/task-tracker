import express from 'express'
import { connectToMongoDB } from './db'
import userRouter from './routes/user.routes'
import taskRouter from './routes/task.routes'
import mongoose from 'mongoose'

connectToMongoDB()

const app = express()
const PORT = 5500

app.use(express.json())

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Task tracker server.' })
})

app.use('/users', userRouter)
app.use('/tasks', taskRouter)

app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}.`)
})

// Handle process exit or termination
process.on('exit', async () => {
	try {
		await mongoose.connection.close()
		console.log('MongoDB connection closed through app termination')
		process.exit(0)
	} catch (error) {
		console.error('Error closing MongoDB connection:', error)
		process.exit(1)
	}
})

process.on('SIGINT', async () => {
	try {
		await mongoose.connection.close()
		console.log('MongoDB connection closed through app termination (SIGINT)')
		process.exit(0)
	} catch (error) {
		console.error('Error closing MongoDB connection:', error)
		process.exit(1)
	}
})
