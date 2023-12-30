import jwt from 'jsonwebtoken'
import 'dotenv/config'

type Payload = {
	name: string
	email: string
	id: string
}

const secret = process.env.JWT_SECRET as string

export const generateToken = (payload: Payload) => {
	const token = jwt.sign(payload, secret, { expiresIn: '30d' })
	return token
}

export const verifyToken = (token: string): string | null => {
	try {
		const decoded: Payload = jwt.verify(token, secret) as Payload

		return decoded.id
	} catch (error) {
		console.error(error)
		return null
	}
}
