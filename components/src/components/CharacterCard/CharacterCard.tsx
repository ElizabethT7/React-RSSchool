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
  const date = character && new Date(`${character.created}`).toLocaleDateString('en-GB');

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
        <button className={styles.character__button} onClick={() => setModalActive(true)}>
          View more
        </button>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className={styles.character__img_modal}>
          <img src={character?.image} alt="character image" />
          <div className={styles.like}></div>
        </div>
        <div className={styles.character__content_modal}>
          <h3 className={styles.character__title_modal}>{character?.name}</h3>
          <Description title="Species:" description={character?.species} />
          <Description title="Type:" description={character.type !== '' ? character.type : '-'} />
          <Description title="Gender:" description={character?.gender} />
          <Description title="Status:" description={character?.status} />
          <Description title="Origin:" description={character?.origin.name} />
          <Description title="Location:" description={character?.location.name} />
          <div className={styles.episodes__container}>
            <h4>Episode:</h4>
            <div className={styles.episodes}>
              {character?.episode &&
                character?.episode.map((episode, index) => (
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
