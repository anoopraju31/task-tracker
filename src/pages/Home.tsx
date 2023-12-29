import Header from '../components/Header'
import TasksContainer from '../components/TasksContainer'
import TaskForm from '../components/TaskForm'

const Home = () => {
	return (
		<div className='container mx-auto max-w-3xl'>
			<Header />
			<TaskForm />
			<TasksContainer />
		</div>
	)
}

export default Home
