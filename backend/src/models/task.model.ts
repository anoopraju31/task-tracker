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

export const getTasks = async (userId: mongoose.Types.ObjectId | string) => {
	try {
		const tasks = await TaskModel.find({ userId })

		return tasks
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const createTask = async (taskData: Record<string, any>) => {
	try {
		const task = await new TaskModel(taskData).save()
		return task.toObject()
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const deleteTaskById = async (id: string) => {
	try {
		await TaskModel.findOneAndDelete({ _id: id })
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const updateTaskById = async (
	id: string,
	taskData: Record<string, any>,
) => {
	try {
		await TaskModel.findOneAndUpdate({ _id: id, taskData })
	} catch (error) {
		console.error(error)
		throw error
	}
}
