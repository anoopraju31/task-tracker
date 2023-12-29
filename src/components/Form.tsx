import { ChangeEvent } from 'react'
import InputField from './InputField'

const Form = () => {
	return (
		<form className='p-6 flex flex-col gap-4'>
			<InputField
				id='title'
				label='Title'
				placeholder='Enter title'
				type='text'
				value={''}
				handleChange={(e: ChangeEvent<HTMLInputElement>) => {
					console.log(e)
				}}
			/>

			<InputField
				id='description'
				label='Description'
				placeholder='Enter description'
				type='text'
				value={''}
				handleChange={(e: ChangeEvent<HTMLInputElement>) => {
					console.log(e)
				}}
			/>
		</form>
	)
}

export default Form
