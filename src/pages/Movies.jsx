import { useEffect, useState } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import SearchBox from '../components/SearchBox';
import { getSearchMovies } from '../services/api';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  useEffect(() => {
    async function searchMovies() {
      if (!searchQuery) {
        return;
      }
      try {
        setLoading(true);
        setError(false);
        const movie = await getSearchMovies(searchQuery);
        setMovies(movie);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    searchMovies();
  }, [searchQuery]);

  const handleSubmit = querySearch => {
    setSearchParams({ query: querySearch });
  };

  const elements = movies.map(({ id, title, poster_path }) => (
    <li key={id}>
      <Link to={`/movies/${id}`} state={{ from: location }}>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title}
        ></img>
        <p>{title}</p>
      </Link>
    </li>
  ));

  return (
    <div>
      <SearchBox onSubmit={handleSubmit} />
      {loading && (
        <Oval
          ariaLabel="loading-indicator"
          height={100}
          width={100}
          strokeWidth={5}
          strokeWidthSecondary={1}
          color="blue"
          secondaryColor="white"
        />
      )}
      {error && <p>Error: {error}</p>}
      {movies.length > 0 && <ul>{elements}</ul>}
      {!loading && searchQuery && movies.length < 1 && <p>Nothing found!</p>}
    </div>
  );
}

export default Movies;
