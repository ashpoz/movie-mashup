export async function getMovieDetails(tmdbId) {
  if (tmdbId) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    };
  
    const getMovieDetails = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}`, options);

    return getMovieDetails.json()
  }
}