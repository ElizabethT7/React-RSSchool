import { NavLink, Outlet } from 'react-router-dom';

import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#638110de' : '#ffffffde' })}>
          Home
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => ({ color: isActive ? '#638110de' : '#ffffffde' })}
        >
          About us
        </NavLink>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;