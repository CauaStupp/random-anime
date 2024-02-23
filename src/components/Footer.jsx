import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.gradient}></div>
      <div className={styles.links}>
        <h3>Links</h3>
        <ul>
          <li>
            <a href="">Github</a>
          </li>
          <li>
            <a href="">Twitter</a>
          </li>
        </ul>
      </div>
      <div className={styles.copy}>
        <p>AnimeAddom ©</p>
      </div>
      <div className={styles.links}>
        <h3>Créditos</h3>
        <ul>
          <li>
            <a href="">Jikan API</a>
          </li>
          <li>
            <a href="">BetterAnime</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;