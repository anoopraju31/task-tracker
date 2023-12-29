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
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

export const TaskModel = mongoose.model('Task', TaskSchema)

export const getTasks = (userId: mongoose.Types.ObjectId | string) =>
	TaskModel.find({ userId })
