import { Link } from 'react-router-dom';
import './NotFound.module.css';

const NotFoundPage = () => {
  return (
    <main>
      <h2>404 Page not found</h2>
      <p>
        This page doesn&apos;t exist. Go
        <Link to="/"> home</Link>
      </p>
    </main>
  );
};

export default NotFoundPage;
