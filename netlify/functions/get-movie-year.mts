export async function getMovieYear(tmdbId) {
  if (tmdbId) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    };
  
    const getMovieYear = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}`, options);
    const json = await getMovieYear.json()
    const year = new Date(json.release_date).getFullYear()

    return year
  }
}

