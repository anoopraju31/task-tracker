import Header from '../components/Header'
import TodoForm from '../components/TodoForm'

const Home = () => {
	return (
		<div className='container mx-auto max-w-3xl'>
			<Header />
			<TodoForm />
		</div>
	)
}

export default Home
