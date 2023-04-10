import { Link } from 'react-router-dom';
import './NotFound.module.css';

const NotFoundPage = () => {
  return (
    <div>
      <h2>404 Page not found</h2>
      <p>
        This page doesn&apos;t exist. Go
        <Link to="/"> home</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
