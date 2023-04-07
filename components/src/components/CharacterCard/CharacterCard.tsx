import ICharacter from './types';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: ICharacter;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <div className={styles.character} data-testid="character">
      <div className={styles.character__img}>
        <img src={character.image} alt="product image" />
        <div className={styles.like}></div>
      </div>
      <div>
        <h3 className={styles.character__title}>{character.name}</h3>
      </div>
      <button className={styles.character__button}>View more</button>
    </div>
  );
};

export default CharacterCard;
