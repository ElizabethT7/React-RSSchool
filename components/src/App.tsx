import {
  Route,
  //RouterProvider,
  Routes,
  //createBrowserRouter,
  //createRoutesFromElements,
} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Layout/Layout';
import ToursPage from './pages/ToursPage/ToursPage';
import ViewToursPage from './pages/ViewToursPage/ViewToursPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
      <Route index element={<MainPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="tours" element={<ToursPage />} />
      <Route path="viewTours" element={<ViewToursPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
