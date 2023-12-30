import express from 'express'
import { signUpSchema } from '../utills/validations'
import { createUser, getUserByEmail } from '../models/user.model'
import { encryptPassword } from '../utills/password'

export const signUpController = async (
	req: express.Request,
	res: express.Response,
) => {
	try {
		const { name, email, password } = req.body
		const validationResponse = signUpSchema.safeParse({ name, email, password })

		if (!validationResponse.success)
			return res.status(401).json(validationResponse.error.issues[0].message)

		const isUserExists = await getUserByEmail(email)

		if (isUserExists)
			return res.status(400).json({ message: 'User already exists.' })

		const hashedPassword = await encryptPassword(password)

		await createUser({
			name,
			email,
			authentication: { password: hashedPassword },
		})

		res.json({ message: 'User created successfully.' })
	} catch (error) {
		console.error(error)
	}
}
