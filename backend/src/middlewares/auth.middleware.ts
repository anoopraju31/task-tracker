import express from 'express'
import { verifyToken } from '../utills/jwt'

export const authMiddleware = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	try {
		const authorization = req.headers?.authorization
		const token = authorization?.split(' ')[1] as string
		const decodedToken = verifyToken(token)

		if (!decodedToken)
			return res.status(403).json({ message: 'unauthorized access' })

		req.headers['user-id'] = decodedToken

		next()
	} catch (error) {
		console.error(error)

		res.status(500).json({ message: 'something went wrong' })
	}
}
