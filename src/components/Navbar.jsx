import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import Logo from '../assets/logo.png'
import { AiFillHome, AiFillHeart } from 'react-icons/ai'

const Navbar = () => {
	return (
		<nav className={styles.nav}>
			<div className={styles.navArea}>
				<img src={Logo} alt="" />
				<div className={styles.links}>
					<Link to={'/'}>
						<AiFillHome/>
						Home
					</Link>
					<Link to={'favorites'}>
						<AiFillHeart/>
						Favorites
					</Link>
				</div>
			</div>
		</nav>
	)
}

export default Navbar