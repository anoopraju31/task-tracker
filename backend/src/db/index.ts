import mongoose from 'mongoose'
import 'dotenv/config'

let dbInstance: typeof mongoose | null = null

export const connectToMongoDB = async (): Promise<typeof mongoose> => {
	try {
		if (!dbInstance) {
			const connectionUri: string = process.env.MONGO_URL as string
			const connection = await mongoose.connect(connectionUri)

			dbInstance = connection

			mongoose.connection.on('connected', () => {
				console.log('Mongoose connected to the database')
			})

			mongoose.connection.on('error', (error: Error) => {
				console.error('Mongoose connection error:', error)
			})

			mongoose.connection.on('disconnected', () => {
				console.log('Mongoose disconnected from the database')
			})
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
			await dbInstance.disconnect()
			console.log('Disconnected from the database')
		}
	} catch (error: any) {
		console.error('Error disconnecting from the database:', error.message)
		throw error
	}
}
