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
		pasword: {
			type: String,
			required: true,
			select: false,
		},
	},
})

export const UserModel = mongoose.model('User', UserSchema)
