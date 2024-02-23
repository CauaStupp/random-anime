import { useEffect, useState } from 'react';
import styles from './Favorites.module.css';
import Loading from '../components/Loading';
import { TbHeartOff } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    const animesFavorites = localStorage.getItem('favorites');

    if (animesFavorites) {
      const favoriteAnimes = JSON.parse(animesFavorites);
      setFavorites(favoriteAnimes);
    } else {
      setFavorites([]);
    }
  }, [])

  useEffect(() => {
    // Função para fazer uma solicitação à API Jikan
    async function fetchAnimeData(animeName) {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados do anime: ${animeName}`);
        }
        const data = await response.json();
        return data.data[0];
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    // Obtenha os dados dos animes favoritos usando fetch
    async function fetchDataForFavoriteAnimes() {
      const animeData = await Promise.all(
        favorites.map(async (animeName) => {
          return await fetchAnimeData(animeName.replace(/[ !;:,°']/g, ' '));
        })
      );

      // Filtrar animes nulos (aqueles que causaram erro durante a solicitação)
      const filteredAnimeData = animeData.filter((anime) => anime !== null);
      setAnimeData(filteredAnimeData);
    }

    if (favorites && favorites.length > 0) {
      fetchDataForFavoriteAnimes();
    }
  }, [favorites]);

  console.log(animeData)

  if (animeData.length > 0) {
    return (
      <div className={styles.content}>
        <h2>Favorites</h2>
  
        {animeData.map((anime, index) => (
          <div key={index} className={styles.animes}>
            {anime ? (
              <>
                <div className={styles.image}>
                  <img src={anime.images.webp.large_image_url} alt={anime.title} />
                </div>
                <div className={styles.animeInfo}>
                  <div className={styles.title}>
                    <h3>{anime.title}</h3>
                    <p>{anime.synopsis}</p>
                  </div>
                  
                  <div className={styles.infos}>
                    <p>{anime.year}</p>
                    <div className={styles.producers}>
                      {anime.genres.length > 1 ? (
                        anime.genres.length > 4 ? (
                          anime.genres.slice(0, 4).map(genre => (
                            <span key={genre.mal_id}>{genre.name}</span>
                          ))
                        ) : (
                          anime.genres.map(genre => (
                            <span key={genre.mal_id}>{genre.name}</span>
                          ))
                        )
                        ) : (
                          <span className='notFound'>n/a</span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    )
  } else if (animeData.length === 0) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundArea}>
          <TbHeartOff />
          <h2>Nenhum Anime Encontrado</h2>
          <p>Ou tente resetar a paginá!</p>
          <button onClick={() => window.location.reload()}>Reset</button>
        </div>
      </div>
    )
  } else {
    <Loading />
  }
}

export default Favorites;