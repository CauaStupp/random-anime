import React from 'react';
import Animes from '../components/Animes';

import styles from './Home.module.css';

const Home = () => {
  return (
    <main className={styles.main}>
      <Animes />
    </main>
  )
}

export default Home