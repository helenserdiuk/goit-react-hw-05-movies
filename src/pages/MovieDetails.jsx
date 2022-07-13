import {
  useParams,
  useLocation,
  Link,
  NavLink,
  Outlet,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { getMovieDetails } from '../services/api';

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const goBack = location?.state?.from ?? '/';

  useEffect(() => {
    async function getDetails() {
      try {
        setLoading(true);
        setError(false);
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getDetails();
  }, [movieId]);

  return (
    <div>
      <span>
        <Link to={goBack} className="btn__goBack">
          &#10094; Go back
        </Link>
      </span>

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
      {movie && (
        <div>
          <div className="aboutMovie">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="aboutMovie__Info">
              <h2>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h2>
              {movie?.vote_average && (
                <p>User Score: {movie.vote_average * 10}%</p>
              )}
              <h3>Overview</h3>
              {movie?.overview && <p>{movie.overview}</p>}
              <h3>Genres</h3>
              {movie.genres.length > 0 && (
                <p>{movie.genres.map(({ name }) => name).join(', ')}</p>
              )}
            </div>
          </div>
          <div className="aboutMovie__Additional">
            <p>Additional Information</p>
            <ul>
              <li>
                <NavLink to="cast" state={{ from: goBack }}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" state={{ from: goBack }}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default MovieDetails;
