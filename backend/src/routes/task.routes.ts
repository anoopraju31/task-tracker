import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { taskSchema } from '../utills/validations'
import { getUserById, getUserTasks } from '../models/user.model'
import { TaskModel } from '../models/task.model'

const router = express.Router()

router.post('/create', authMiddleware, async (req, res) => {
	try {
		const userId = req.headers['user-id'] as string
		const { title, description, targetDate } = req.body
		const validationResponse = taskSchema.safeParse({
			title,
			description,
			targetDate,
		})

		if (!validationResponse.success)
			return res
				.status(401)
				.json({ message: validationResponse.error.issues[0].message })

		const user = await getUserById(userId)

		if (!user) return res.status(403).json({ message: 'user not found' })

		const task = new TaskModel({
			title,
			description,
			isCompleted: false,
			targetDate,
			userId,
		})

		await task.save()

		user.tasks.push(task._id)
		await user.save()

		res.json({
			message: 'successfully created task.',
			task,
		})
	} catch (error) {
		console.error(error)

		res.status(500).json({ message: 'something went wrong' })
	}
})

router.get('/', authMiddleware, async (req, res) => {
	try {
		const userId = req.headers['user-id'] as string

		const user = await getUserById(userId)

		if (!user) return res.status(403).json({ message: 'user not found' })

		const tasks = await getUserTasks(userId)

		res.json({ tasks })
	} catch (error) {
		console.error(error)

		res.status(500).json({ message: 'something went wrong' })
	}
})

export default router
