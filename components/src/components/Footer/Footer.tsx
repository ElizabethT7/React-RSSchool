import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__item}>
          <a href="https://github.com/ElizabethT7" className={styles.link_github}></a>
        </div>
        <div className={styles.footer__item}>&copy;2023</div>
        <div className={styles.footer__item}>
          <a href="https://rs.school/react/" className={styles.link_RS}></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
