import express from 'express'
import { signInSchema } from '../utills/validations'
import { getFullUserDetailsByEmail } from '../models/user.model'
import { comparePassword } from '../utills/password'
import { generateToken } from '../utills/jwt'
import { signUpController } from '../controllers/user.controllers'

const router = express.Router()

router.post('/sign-up', signUpController)

router.post('/sign-in', async (req, res) => {
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

	const token = generateToken({ name: user.name, email, id: user._id })

	res.json({ message: 'successfully signed in.', token })
})

export default router
