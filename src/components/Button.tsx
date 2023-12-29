import { FC } from 'react'

type Props = {
	type: 'submit' | 'reset' | 'button'
	title: string
	handleClick: () => void
	styles?: string
}

const Button: FC<Props> = (props) => {
	const { type = 'button', title, handleClick, styles } = props
	return (
		<button
			type={type}
			onClick={handleClick}
			className={`inline-flex items-center justify-center font-todo rounded-md text-sm font-medium ring-offset-stone-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-stone-500 text-stone-100 hover:bg-stone-500/90 h-10 px-4 py-2 mt-2 ${styles}`}>
			{title}
		</button>
	)
}

export default Button
