import z from 'zod'

const nameSchema = z.string().min(1, { message: 'Name is required' })

const emailSchema = z
	.string()
	.min(1, { message: 'Email is required.' })
	.email('Invalid email.')

const passwordSchema = z
	.string()
	.min(8, { message: 'Password must contain atleast 8 characters' })

export const signUpSchema = z.object({
	name: nameSchema,
	email: emailSchema,
	password: passwordSchema,
})
