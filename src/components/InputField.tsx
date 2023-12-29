import { ChangeEvent } from 'react'

type Props = {
	id: string
	label: string
	placeholder: string
	value: string
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void
	type: 'text' | 'email'
}

const InputField = (props: Props) => {
	const { id, label, placeholder, value, handleChange, type } = props
	return (
		<div>
			<label className='sr-only' htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				value={value}
				className='flex h-10 rounded-md border border-stone-100 bg-stone-200 px-3 py-2 text-sm ring-offset-stone-400 file:border-0 placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-100 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-grow w-full'
				placeholder={placeholder}
				type={type}
				onChange={handleChange}
			/>
		</div>
	)
}

export default InputField
