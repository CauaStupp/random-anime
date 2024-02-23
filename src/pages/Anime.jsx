import { useEffect, useState } from 'react';
import styles from './Anime.module.css';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { AiFillHeart, AiFillPlayCircle } from 'react-icons/ai';
import { FaExchangeAlt, FaToilet } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InformationAnime from '../components/InformationAnime';
import Trailer from '../components/Trailer';

const Anime = () => {
  const [anime, setAnime] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [changeInfo, setChangeInfo] = useState(true);
  const [dub, setDub] = useState('legendado');
  const [favorites, setFavorites] = useState([]);
  const { id } = useParams();
  

  useEffect(() => {
    const notificationClosed = localStorage.getItem('closeInfo');

    async function fetchAnime() {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${id}`);
      const json = await response.json();
      setAnime(json.data[0]);
    }

    


    if (!notificationClosed) {
      toast.warn(
        <div className={styles.box}>
          <p className={styles.message}>
            <strong>ATENÇÃO</strong>: A função de trocar o anime para dublado e legendado pode não funcionar para todos os animes!
          </p>
          <button onClick={saveNotification} className={styles.btn}>
            ok
          </button>
        </div>,
        {
          autoClose: false,
          closeButton: false,
          closeOnClick: false,
          position: "top-center",
          toastId: id,
        }
      )
    }


    fetchAnime();
  }, [])


  function verifyFavorite() {
    const getAnimeFavorite = localStorage.getItem('favorites');
    const formatedAnimeFavorite = JSON.parse(getAnimeFavorite);

    if (anime && formatedAnimeFavorite.includes(anime.title.toLowerCase())) {
      setFavorite(true);
    }
  }

  function saveNotification() {
    toast.dismiss();
    localStorage.setItem('closeInfo', 'true');
  }

  function changeDub() {
    if (dub === 'dublado') {
      setDub('legendado');
    } else setDub('dublado');
  }

  function notify(validate) {
    const favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    const title = anime.title.replace(/[ ;:,°']/g, ' ').toLowerCase();

    if (!validate) {
      const updateFavorites = [...favoritesFromLocalStorage, title];
      setFavorites(updateFavorites);
      localStorage.setItem('favorites', JSON.stringify(updateFavorites))
      toast.success(`O anime ${anime.title} foi favoritado!`, {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      const updatedFavorites = favorites.filter((favorite) => favorite !== title);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      toast.info(`O anime ${anime.title} foi removido dos favoritos!`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }

  function favoriteAnime() {
    setFavorite(!favorite)
    notify(favorite);
  }

  function validateLink() {
    const title = anime.title.toLowerCase();
    const titleFormated = title.replace(/[ ;:,°']/g, '-');
    const newTitle = titleFormated.split(' ');
    const lastTitle = newTitle.pop();
    const lept = newTitle.join(' ') + lastTitle.replace('-', '') ;
    if (dub === 'dublado') {
      return `https://betteranime.net/anime/${dub}/${titleFormated.includes('--') ? titleFormated.replace('--', '-') : lept}-dublado`   
    } else {
      return `https://betteranime.net/anime/${dub}/${titleFormated.includes('--') ? titleFormated.replace('--', '-') : lept}`;
    }
  }


  if (anime) {
    return (
      <div className={styles.anime + ' fade'} onLoad={verifyFavorite}>
        <h2>{anime.title}</h2>
        <div className={styles.animeArea}>
          <div className={styles.animeImage}>
            <img src={anime.images.webp.large_image_url} alt={`Imagem de capa do ${anime.title}`} />
            <div className={styles.change}>
              <a href={validateLink()} target='_BLANK'>
                <span>{dub}</span>
                <AiFillPlayCircle />
                ASSISTIR AGORA
              </a>
              <button onClick={changeDub}>
                <FaExchangeAlt />
              </button>
            </div>
            
          </div>
          <div className={styles.animeInfo}>
            <nav>
              <div className={styles.links}>
                <span onClick={() => setChangeInfo(true)} className={changeInfo ? styles.linkActive : styles.linkDisabled}>Sinopse</span>
                <span onClick={() => setChangeInfo(false)} className={!changeInfo ? styles.linkActive : styles.linkDisabled}>Informações</span>
              </div>
              <button className={styles.favorite}>
                <AiFillHeart onClick={favoriteAnime} className={favorite ? styles.active : styles.disabled} />
              </button>
            </nav>
            {!changeInfo ? (
              <InformationAnime {...anime}/>
            ) : (
              <p className={styles.sinopse + ' fade'}>{anime.synopsis}</p>
            )}
          </div>
        </div>
        <div className='separate-10'><div></div></div>
        <Trailer embed_url={anime.trailer.embed_url}/>
        <ToastContainer />
      </div>
    )
  } else {
    return <Loading />
  }
  
}

export default Anime;