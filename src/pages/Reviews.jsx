import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { getMovieReviews } from '../services/api';

function Reviews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    async function getCast() {
      try {
        setLoading(true);
        setError(false);
        const movieReviews = await getMovieReviews(movieId);
        setReviews(movieReviews);
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
      {error && <p> Error : {error}</p>}
      {reviews && (
        <ul>
          {reviews.results.length > 0 ? (
            reviews.results.map(({ author, content, id }) => (
              <li key={id}>
                <p>Author: {author}</p>
                <p>{content}</p>
              </li>
            ))
          ) : (
            <p>No information</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default Reviews;
