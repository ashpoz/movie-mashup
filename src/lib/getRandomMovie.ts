import movies from '../data/movies';

export function getRandomMovie() {
  // TODO: set up with API
  // const response = await fetch(movies);
  // const data = await response.json();
  const data = movies;
  const randomArrIndex = Math.floor(Math.random() * data.length);
  
  return data[randomArrIndex]
}

