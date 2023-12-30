import bcrypt from 'bcrypt'
import 'dotenv/config'

const salt = parseInt(process.env.SALT_ROUNDS as string)

export const encryptPassword = async (password: string): Promise<string> => {
	try {
		const hashedPassword = await bcrypt.hash(password, salt)

		return hashedPassword
	} catch (error) {
		console.error('Encryption error:', error)
		throw new Error('Encryption failed')
	}
}

export const comparePassword = async (
	inputPassword: string,
	hashedPassword: string,
): Promise<Boolean> => {
	try {
		const passwordMatch = await bcrypt.compare(inputPassword, hashedPassword)

		return passwordMatch
	} catch (error) {
		console.error('Decryption error:', error)
		throw new Error('Decryption failed')
	}
}
