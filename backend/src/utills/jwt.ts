import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secret = process.env.JWT_SECRET as string

export const generateToken = (payload: object) => {
	const token = jwt.sign(payload, secret, { expiresIn: '30d' })
	return token
}
