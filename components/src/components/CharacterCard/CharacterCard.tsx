import ICharacter from './types';
import styles from './CharacterCard.module.css';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import Description from '../Card/Description';

interface CharacterCardProps {
  character: ICharacter;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const [modalActive, setModalActive] = useState(false);
  const [characterId, setCharacterId] = useState<ICharacter>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const date = characterId && new Date(`${characterId.created}`).toLocaleDateString('en-GB');

  const handleChange = async () => {
    setModalActive(true);
    await fetch(`https://rickandmortyapi.com/api/character/${character.id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error('Input other name');
        }
        return res.json();
      })
      .then((data) => {
        setCharacterId(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  };

  return (
    <>
      <div className={styles.character} data-testid="character">
        <div className={styles.character__img}>
          <img src={character.image} alt="character image" />
          <div className={styles.like}></div>
        </div>
        <div>
          <h3 className={styles.character__title}>{character.name}</h3>
        </div>
        <button className={styles.character__button} onClick={handleChange}>
          View more
        </button>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        <div className={styles.character__img_modal}>
          <img src={characterId?.image} alt="character image" />
          <div className={styles.like}></div>
        </div>
        <div className={styles.character__content_modal}>
          <h3 className={styles.character__title_modal}>{characterId?.name}</h3>
          <Description title="Species:" description={characterId?.species} />
          <Description
            title="Type:"
            description={characterId?.type !== '' ? character.type : '-'}
          />
          <Description title="Gender:" description={characterId?.gender} />
          <Description title="Status:" description={characterId?.status} />
          <Description title="Origin:" description={characterId?.origin.name} />
          <Description title="Location:" description={characterId?.location.name} />
          <div className={styles.episodes__container}>
            <h4>Episode:</h4>
            <div className={styles.episodes}>
              {characterId?.episode &&
                characterId?.episode.map((episode, index) => (
                  <div key={index}>
                    <a href={episode} className={styles.episode}>
                      {index + 1}
                    </a>
                  </div>
                ))}
            </div>
          </div>
          <Description title="Created:" description={date} />
        </div>
      </Modal>
    </>
  );
};

export default CharacterCard;
