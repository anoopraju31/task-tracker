import z from 'zod'

const nameSchema = z.string().min(1, { message: 'Name is required.' })
const emailSchema = z
	.string()
	.min(1, { message: 'Email is required.' })
	.email('Invalid email.')
const passwordSchema = z
	.string()
	.min(8, { message: 'Password must contain atleast 8 characters.' })

export const signUpSchema = z.object({
	name: nameSchema,
	email: emailSchema,
	password: passwordSchema,
})

export const signInSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
})

const titleSchema = z.string().min(1, { message: 'Title is required.' })
const descriptionSchema = z.string()
const targetDateSchema = z
	.string()
	.datetime({ message: 'Invalid target date.' })
	.refine(
		(str) => {
			const date = new Date(str)
			return !isNaN(date.getTime()) && date.getTime() > Date.now()
		},
		{
			message: 'target date must be a valid future date.',
		},
	)

export const taskSchema = z.object({
	title: titleSchema,
	description: descriptionSchema,
	targetDate: targetDateSchema,
})
