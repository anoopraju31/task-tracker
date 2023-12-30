import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	authentication: {
		password: {
			type: String,
			required: true,
			select: false,
		},
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task',
		},
	],
})

export const UserModel = mongoose.model('User', UserSchema)

export const getUserByEmail = async (email: string) => {
	try {
		const user = await UserModel.findOne({ email })

		return user
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const getFullUserDetailsByEmail = async (email: string) => {
	try {
		const user = await UserModel.findOne({ email }).select(
			'+authentication.password',
		)

		return user
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const createUser = async (userData: Record<string, any>) => {
	try {
		const user = new UserModel(userData)
		await user.save()
		return user.toObject()
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const deleteUserByEmail = async (email: string) => {
	try {
		await UserModel.findOneAndDelete({ email })
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const updateUserByEmail = async (
	email: string,
	newUserData: Record<string, any>,
) => {
	try {
		await UserModel.findOneAndUpdate({ email, newUserData })
	} catch (error) {
		console.error(error)
		throw error
	}
}
