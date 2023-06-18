import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Header/Header';
import ToursPage from './pages/ToursPage/ToursPage';
import ViewToursPage from './pages/ViewToursPage/ViewToursPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

const App = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        margin: '0',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route index element={<MainPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="tours" element={<ToursPage />} />
        <Route path="viewTours" element={<ViewToursPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
