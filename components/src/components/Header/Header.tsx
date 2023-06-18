import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#638110de' : '#ffffffde' })}>
          Home
        </NavLink>
        <NavLink
          to="/viewTours"
          style={({ isActive }) => ({ color: isActive ? '#638110de' : '#ffffffde' })}
        >
          Tours
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => ({ color: isActive ? '#638110de' : '#ffffffde' })}
        >
          About us
        </NavLink>
        <NavLink
          to="/tours"
          style={({ isActive }) => ({ color: isActive ? '#638110de' : '#ffffffde' })}
        >
          Add tours
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
