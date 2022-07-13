import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { getMovieCredits } from '../services/api';

function Cast() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);
  useEffect(() => {
    async function getCast() {
      try {
        setLoading(true);
        setError(false);
        const movieActors = await getMovieCredits(movieId);
        setActors(movieActors);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  return (
    <div>
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
      {error && <p> Error: {error}</p>}
      {actors?.cast.length < 1 && <p>No information</p>}
      {actors && (
        <ul>
          {actors.cast.map(({ id, profile_path, name, character }) => (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w300${profile_path}`}
                alt={name}
              />
              <p>Name: {name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cast;
