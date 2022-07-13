import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { getTrending } from '../services/api';

function Home() {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const movies = await getTrending();
        setState(movies);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  const elements = state.map(({ id, title }) => (
    <li key={id}>
      <Link to={`/movies/${id}`}>
        <p> {title}</p>
      </Link>
    </li>
  ));
  return (
    <div className="container__Home">
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
      <h1>Trending today</h1>
      <ul>{elements}</ul>
    </div>
  );
}

export default Home;
