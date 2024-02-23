import { MdImageNotSupported } from 'react-icons/md';
import styles from './Trailer.module.css';

const Trailer = ({ embed_url }) => {
  return (
    <div className={styles.trailer}>
      <h2>Trailer</h2>
      <div className={styles.video}>
        {embed_url ? (
          <iframe
            width="560"
            height="315"
            src={embed_url}
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen>
          </iframe>
        ) : (
          <div className={styles.notFound}>
            <MdImageNotSupported />
            <h3>Trailer Indisponível no momento</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default Trailer