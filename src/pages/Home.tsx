import Header from '../components/Header'
import TasksContainer from '../components/TasksContainer'
import TodoForm from '../components/TodoForm'

const Home = () => {
	return (
		<div className='container mx-auto max-w-3xl'>
			<Header />
			<TodoForm />
			<TasksContainer />
		</div>
	)
}

export default Home
