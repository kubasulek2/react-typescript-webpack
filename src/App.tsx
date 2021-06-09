import styles from './Styles.module.css';
import ClickCounter from './ClickCounter';

const App = () => {
	const a = 'A';
	return (
		<>
			<h1 className={styles.header}>{'Hello ! ' + process.env.NODE_ENV + a}</h1>
			<ClickCounter />
		</>
	);
};

export default App;
