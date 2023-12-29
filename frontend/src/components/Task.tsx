import Button from './Button'

const Task = () => {
	return (
		<article className='rounded-lg border border-stone-600 shadow-sm'>
			<div className='flex flex-col space-y-1.5 p-6'>
				<h3 className='text-2xl font-semibold leading-none text-stone-600  tracking-tight'>
					Task title
				</h3>
			</div>

			<p className='px-6 py-2 text-sm text-stone-600'>task description</p>

			<div className='items-center p-6 flex gap-4 justify-end'>
				<Button
					title='Mark as done'
					styles='!bg-green-500 hover:!bg-green-500/90'
					handleClick={() => {}}
					type='button'
				/>
				<Button title='Edit' handleClick={() => {}} type='button' />
				<Button
					title='Delete'
					styles='!bg-red-500 hover:!bg-red-500/90'
					handleClick={() => {}}
					type='button'
				/>
			</div>
		</article>
	)
}

export default Task
