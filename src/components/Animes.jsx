import { useEffect, useState } from 'react';
import styles from './Animes.module.css'
import Loading from './Loading';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Animes = () => {

  const [animes, setAnimes] = useState(null);
  const url = 'https://api.jikan.moe/v4/';
  const endpoint = 'recommendations/anime';


  useEffect(() => {
    async function fetchAnime(url, endpoint) {
      const response = await fetch(url + endpoint);
      const json = await response.json();

      setAnimes(json.data);
    }

    fetchAnime(url, endpoint);   
  }, [])

  console.log(animes);

  return (
    <div>
      {animes ? (
        <div className={styles.animeArea}>
          {animes.map((animes, index) => {
            const title = animes.entry[0].title.replace('-', ' ');

            return (
              <div key={index} className={styles.animeCard} title={title}>
                <Link to={`anime/${title.toLowerCase()}`}>
                  <div className={styles.animeImage}>
                    <img src={animes.entry[0].images.webp.large_image_url} alt="" />
                  </div>
                  <h2>{title.length > 35 ? 
                  title.substring(0, 35) + '...' : title}</h2>
                </Link>
              </div>
            )
          })}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Animes