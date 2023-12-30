import express from 'express'
import { signInSchema, signUpSchema } from '../utills/validations'
import {
	createUser,
	getFullUserDetailsByEmail,
	getUserByEmail,
} from '../models/user.model'
import { comparePassword, encryptPassword } from '../utills/password'
import { generateToken } from '../utills/jwt'

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

		res.status(500).json({ message: 'something went wrong' })
	}
}

export const signInController = async (
	req: express.Request,
	res: express.Response,
) => {
	try {
		const { email, password } = req.body
		const validationResponse = signInSchema.safeParse({ email, password })

		if (!validationResponse.success)
			return res.status(401).json(validationResponse.error.issues[0].message)

		const user = await getFullUserDetailsByEmail(email)

		if (!user) return res.status(401).json({ message: 'User does not exists.' })

		const passwordMatch = await comparePassword(
			password,
			user.authentication?.password!,
		)

		if (!passwordMatch)
			return res.status(403).json({ message: 'Invalid password' })

		const token = generateToken({
			name: user.name,
			email,
			id: user._id.toString(),
		})

		res.json({ message: 'successfully signed in.', token })
	} catch (error) {
		console.error(error)

		res.status(500).json({ message: 'something went wrong' })
	}
}
