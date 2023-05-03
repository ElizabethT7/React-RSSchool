import { ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const Modal = ({ active, setActive, children }: ModalProps) => {
  return (
    <div className={active ? styles.active : styles.modal} onClick={() => setActive(false)}>
      <div
        className={active ? styles.modal__content_active : styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={() => setActive(false)}>
          <span className={styles.close__line}></span>
          <span className={styles.close__line}></span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
