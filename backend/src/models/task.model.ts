import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	isCompleted: {
		type: Boolean,
		required: true,
	},
	targetDate: {
		type: Date,
	},
	lastUpdatedDate: {
		type: Date,
		default: Date.now,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

export const TaskModel = mongoose.model('Task', TaskSchema)
