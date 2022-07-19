import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

const ROOT_KEY = '62e63fb69ff45b8c7b26a9723f0eb259';

export async function getTrending() {
  const { data } = await instance.get(`trending/movie/day?api_key=${ROOT_KEY}`);
  return data.results;
}

export async function getSearchMovies(query) {
  const { data } = await instance.get(
    `search/movie?api_key=${ROOT_KEY}&query=${query}`
  );
  return data.results;
}

export async function getMovieDetails(movieId) {
  const { data } = await instance.get(`movie/${movieId}?api_key=${ROOT_KEY}`);
  return data;
}

export async function getMovieCredits(movieId) {
  const { data } = await instance.get(
    `movie/${movieId}/credits?api_key=${ROOT_KEY}`
  );
  return data;
}

export async function getMovieReviews(movieId) {
  const { data } = await instance.get(
    `movie/${movieId}/reviews?api_key=${ROOT_KEY}`
  );
  return data;
}
