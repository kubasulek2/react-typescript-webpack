import styles from './Styles.module.css';
import ClickCounter from './ClickCounter';
const App = () => {
	return (
		<>
		<h1 className={styles.header}>
			{"Hello ! " + process.env.name}
		</h1>
		<ClickCounter />
		</>
	);
};

export default App;
