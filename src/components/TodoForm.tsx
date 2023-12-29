import Form from './Form'

const TodoForm = () => {
	return (
		<section className='my-10 rounded-lg border border-stone-600 text-stone-500 shadow-sm'>
			<div className='flex flex-col space-y-1.5 p-6'>
				<h3 className='font-semibold text-center font-todo tracking-tight text-lg'>
					Add New Task
				</h3>
			</div>

			<Form />
		</section>
	)
}

export default TodoForm
