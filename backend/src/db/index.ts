import mongoose, { Connection } from 'mongoose'
import 'dotenv/config'

let dbInstance: Connection | null = null

export const connectToMongoDB = async (): Promise<Connection> => {
	try {
		if (!dbInstance) {
			const connectionUri: string = process.env.MONGO_URL as string
			const connection = await mongoose.createConnection(connectionUri)

			dbInstance = connection

			connection.on('connected', () => {
				console.log('Mongoose connected to the database')
			})

			connection.on('error', (error: Error) => {
				console.error('Mongoose connection error:', error)
			})

			connection.on('disconnected', () => {
				console.log('Mongoose disconnected from the database')
			})
		}

		if (!dbInstance) {
			throw new Error('Failed to establish database connection')
		}

		return dbInstance
	} catch (error: any) {
		console.error('Error connecting to the database:', error.message)
		throw error
	}
}

export const disconnectFromDatabase = async (): Promise<void> => {
	try {
		if (dbInstance) {
			await dbInstance.close()
			console.log('Disconnected from the database')
		}
	} catch (error: any) {
		console.error('Error disconnecting from the database:', error.message)
		throw error
	}
}
