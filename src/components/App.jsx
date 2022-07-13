import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, Header, Link } from './SharedLayout.styled';

const Home = lazy(() => import('pages/Home'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));
const Movies = lazy(() => import('pages/Movies'));
const Cast = lazy(() => import('pages/Cast'));
const Reviews = lazy(() => import('pages/Reviews'));

function App() {
  return (
    <div className="container">
      <Suspense fallback="">
        <Container>
          <Header>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/movies">Movies</Link>
            </nav>
          </Header>
        </Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
