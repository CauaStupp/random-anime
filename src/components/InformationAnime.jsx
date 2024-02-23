import styles from './InformationAnime.module.css';

const InformationAnime = ({ episodes, score, producers, genres, year, duration, type }) => {
  
  return (
    <div className={styles.content + ' fade'}>
      <div>
        <span>{type === 'Movie' ? 'Tipo' : 'Episódios'}</span>
        <div className='separate'></div>
        <p>{type === 'Movie' ? type : episodes}</p>
      </div>
      <div>
        <span>Score</span>
        <div className='separate'></div>
        <p>{score}</p>
      </div>
      <div>
        <span>Produtores</span>
        <div className='separate'></div>
        {producers.length > 1 ? (
          producers.length > 4 ? (
            producers.slice(0, 4).map(producer => (
              <p key={producer.mal_id}>{producer.name}</p>
            ))
          ) : (
            producers.map(producer => (
              <p key={producer.mal_id}>{producer.name}</p>
            ))
          )
        ) : (
          <p className='notFound'>n/a</p>
        )}
      </div>
      <div>
        <span>Gêneros</span>
        <div className='separate'></div>
        {genres.length > 1 ? (
          genres.map(gen => (
            <p key={gen.mal_id}>{gen.name}</p>
          ))
        ) : (
          <p className='notFound'>n/a</p>
        )}
      </div>
      <div>
        <span>Ano</span>
        <div className='separate'></div>
        <p className={year ? '' : 'notFound'}>{year ? year : 'n/a'}</p>
      </div>
      <div>
        <span>Duração</span>
        <div className='separate'></div>
        <p>{duration}</p>
      </div>
    </div>
  )
}

export default InformationAnime