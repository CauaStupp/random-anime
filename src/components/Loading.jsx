import styles from './Loading.module.css';
import Gojo from '../assets/gojo.png';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src={Gojo} alt="" />
      <h2>Carregando...</h2>
    </div>
  )
}

export default Loading